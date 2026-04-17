# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Branching Strategy

Simplified GitFlow:

- `main` — production-ready, deployed code
- `develop` — integration branch; feature branches merge here before going to main
- `feature/*` — individual work streams, cut from `develop`
- `docs/*` — documentation-only changes

**Workflow:**

1. Cut a new branch from `develop`: `git checkout -b feature/my-thing`
2. Commit work on the feature branch
3. Merge back into `develop` when ready
4. `main` is only updated when shipping to production

**In-progress feature branches (not yet merged):**

| Branch | Description |
| ------ | ----------- |
| `feature/frontend-restructure` | `styled-components` → Emotion swap, `tsconfig` path aliases, `atoms/`, `molecules/`, `organisms/` scaffold |
| `feature/staging-infra` | Staging `deploy/` files, `docker-compose.staging.yml`, `.github/workflows/cd.yml` |
| `docs/project-setup` | `CLAUDE.md`, `ARCHITECTURE.md`, README rewrite, `.gitignore`, `.claude/`, `.clinerules/` |

## Commands

### Frontend (`cd frontend` first, or use Taskfile)
```bash
yarn start          # Dev server at localhost:3000
yarn test           # Run all tests (watch mode)
yarn test --watchAll=false  # Run tests once
yarn test -- --testPathPattern="ComponentName"  # Run a single test file
yarn build          # Production build
```

**Node env note**: The project uses react-scripts 4.x (webpack 4) on Node 18. Set `NODE_OPTIONS=--openssl-legacy-provider` if you hit OpenSSL errors.

### Backend (from project root)
```bash
./gradlew :backend:build        # Compile and package
./gradlew :backend:bootRun      # Run locally (needs MySQL on :3306)
./gradlew :backend:test         # Run Spock tests (needs Docker for Testcontainers)
./gradlew :backend:clean :backend:buildDockerImage  # Build Docker image
```

Backend requires env vars `MYSQL_ROOT_PASSWORD` and `JWT_SECRET`. For local dev, either set them or use the `local` Spring profile (`--spring.profiles.active=local`).

### Dev Stack (Docker Compose)
```bash
task start          # Start full dev stack via docker-compose.dev.yml
task stop           # Stop dev stack
task dev:logs SERVICE=backend   # Tail logs for a service
task dev:rebuild SERVICE=frontend  # Force rebuild one service
```

Dev URLs: frontend at `http://localhost:8080`, backend at `http://localhost:8081`.

### Release
```bash
task release:all DEPLOY_HOST=jocks-karaoke.com DEPLOY_USER=allister
```
This builds and pushes both images, ensures remote env, and deploys via SSH.

## Custom Slash Commands

Three project-specific slash commands are defined in `.claude/commands/`:

| Command | Purpose |
| ------- | ------- |
| `/add-songs` | Add new songs to the White Pen venue from a photo, list, or description |
| `/smart-commit` | Run all quality checks (build + tests) then commit with a good message |
| `/deploy` | Build images, push to Docker Hub, and deploy to production |

## Song Database (White Pen)

"White Pen" (WP) is the karaoke venue. Songs are stored with `LOCATION = 'WP-XXXX'` (zero-padded 4-digit number). All song data lives in Flyway SQL migrations — never edit existing migrations, always add a new one.

Migration naming: `V{N}__new_songs_WP_{firstNum}_{lastNum}.sql` (e.g. `V22__new_songs_WP_376_390.sql`).

SQL format:

```sql
INSERT INTO SONGS (LOCATION, ARTIST, TITLE) VALUES ('WP-0376', 'Artist Name', 'Song Title');
```
Escape single quotes within values as `''` (e.g. `I''m Every Woman`, `Stumblin'' In`).

## Architecture

### Full Stack Overview
- **Frontend**: React 17 + TypeScript, Create React App, Emotion CSS-in-JS
- **Backend**: Spring Boot 2.5.1, Kotlin, Spring Security + JWT, Flyway + MySQL
- **Proxy**: Caddy (automatic HTTPS in prod, routes `/` → frontend, `/api` → backend on :9090)
- **Deployment**: Docker Compose — dev at `deploy/docker-compose.dev.yml`, prod at `deploy/docker-compose.yml`

### Frontend Structure

Follows Atomic Design:
- `src/atoms/` — Primitive components (Button, Input, Modal, LoadingSpinner, SuccessCheckmark). Barrel-exported from `atoms/index.ts`.
- `src/molecules/` — Composite components (SearchBar, HamburgerButton, LoginForm, HighScoreTable, AddHighScoreForm, MenuDrawer)
- `src/organisms/` — Page-level sections (NavBar, HamburgerMenu, HighScores, SongList)
- `src/pages/` — Route-level components (Home)
- `src/components/` — Presentational components (legacy; prefer atoms/molecules/organisms for new work)
- `src/contexts/` — React Context providers: `AuthContext`, `SongContext`, `HighScoreContext`
- `src/services/` — Axios-based API clients: `AuthService`, `SongService`, `HighScoreService`
- `src/theme/` — Emotion theme: exports `rangersTheme`, `celticTheme`, color constants, `globalStyles`
- `src/models/` — TypeScript model interfaces

**Path aliases** (configured in both `tsconfig.json` and `aliases.json`):
`@atoms`, `@components`, `@contexts`, `@hooks`, `@models`, `@molecules`, `@organisms`, `@pages`, `@services`, `@assets`

**Styling**: Emotion only (`@emotion/styled`, `@emotion/react`). The `Theme` interface is declared in `src/emotion.d.ts`. `ThemeProvider` comes from `@emotion/react`. Tests use `@emotion/jest` serializer configured in `setupTests.ts`.

**State**: No Redux. Auth state lives in `AuthContext` (JWT stored in `sessionStorage`); songs and high scores each have their own Context + Service pair.

### Backend Structure

Packages under `com.jockskaraoke.backend`:
- `authentication/` — JWT filter (`AuthTokenFilter`), JWT utilities (`JwtUtils`), user entities, auth controller (`/api/auth/login`, `/api/auth/register`)
- `song/` — `SongController`, `SongService`, `SongRepository` (entity `Song`)
- `highscore/` — `HighScoreController`, `HighScoreService`, `HighScoreRepository` (entity `HighScore`, DTO `HighScoreDTO`)
- `security/` — `SecurityConfig` (Spring Security setup, CORS, public vs protected routes)

Database schema is managed by **Flyway** migrations in `backend/src/main/resources/db/migration/` (versioned `V1__...sql` through `V20+`). Never modify existing migration files; always add a new one.

Backend tests are written in **Spock (Groovy)** and use **Testcontainers** (`org.testcontainers:mysql`) so a running Docker daemon is required. Test files live in `src/test/groovy/`.

### Deploy / Infrastructure

- `deploy/docker-compose.dev.yml` — Dev stack; uses build context; no `--profile` needed for MySQL + backend only, `--profile full` for everything
- `deploy/docker-compose.yml` — Production; uses pre-built images tagged `${BACKEND_TAG:-backend-prod}` / `${FRONTEND_TAG:-frontend-prod}`
- `Caddyfile` (root) mirrors production routing — don't strip WordPress routes from it
- `Taskfile.yml` — All task runner shortcuts; run `task --list` for the full list
- CI/CD: `.github/workflows/` — `ci-staging.yml` (push to main → test → build → deploy staging), `promote-prod.yml` (manual retag)
