# Getting Started with Create React App

# Deployment with Docker (Caddy, Backend, Frontend, MySQL, Portainer)

This repository now includes a containerized deployment using Caddy as the reverse proxy, plus a local development stack.

Changes made:
- Added `deploy/docker-compose.yml` and `deploy/Caddyfile` for production
- Added `deploy/docker-compose.dev.yml` and `deploy/Caddyfile.dev` for local testing

Additional documentation changes:
- Documented one-command release workflow using Taskfile targets
- Added step-by-step image build/push and remote deploy instructions
- Described server secrets in `deploy/.env` and MySQL app user usage
- Added developer workflow for local dev stack (Caddy on high ports)
- Included troubleshooting for Compose, Caddy 502, MySQL auth, and Chrome “Not secure”

@LLM_USAGE Fully LLM generated.
@LLM_USAGE README enhanced by LLM: release/deploy workflow, secrets, troubleshooting.

## Local test (HTTP only)

```
cd deploy
docker compose -f docker-compose.dev.yml up -d --build
open http://localhost:8080  # frontend
open http://localhost:8082  # portainer
```

## Production deploy (HTTPS)

```
cd deploy
export MYSQL_ROOT_PASSWORD=change-me
export JWT_SECRET=$(openssl rand -hex 32)
docker compose up -d --build
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Build and Deploy Workflow (Taskfile)

Prerequisites:
- Docker Engine and Docker Hub login (`docker login`)
- Docker Compose v2 plugin (`docker compose version` shows v2.x)
- Task runner (`brew install go-task/tap/go-task` or see taskfile.dev)

Quick reference:
```
# List available tasks
task --list

# One-command release: build+push images, ensure server env, deploy
task release:all \
  BACKEND_URL=https://backend.jocks-karaoke.com \
  PUBLIC_URL=https://jocks-karaoke.com \
  DEPLOY_HOST=jocks-karaoke.com \
  DEPLOY_USER=allister
```

### Step-by-step release
1) Backend image (fixed tag: `aldoink/jocks-karaoke:backend_1.0.0`)
```
task release:backend-image
```

2) Frontend image (tag = `frontend_<package.json version>`, e.g. `frontend_2.0.0`)
```
task release:frontend-image \
  BACKEND_URL=https://backend.jocks-karaoke.com \
  PUBLIC_URL=https://jocks-karaoke.com
```

3) Ensure server env (creates `deploy/.env` with strong secrets if missing)
```
task release:init-remote-env DEPLOY_HOST=jocks-karaoke.com DEPLOY_USER=allister
```

4) Deploy to server (pull latest images and restart stack)
```
task release:deploy DEPLOY_HOST=jocks-karaoke.com DEPLOY_USER=allister
```

Notes:
- Frontend build bakes `REACT_APP_BACKEND_URL` and `PUBLIC_URL` into assets.
- Caddy auto-HTTPS fronts the site per `deploy/Caddyfile` and proxies to Docker service names.

### Server configuration and secrets
File: `deploy/.env`
```
MYSQL_ROOT_PASSWORD=<generated>
JWT_SECRET=<generated>
MYSQL_APP_USER=app
MYSQL_APP_PASSWORD=<generated>
```
The database is created as `jocks-karaoke`. The backend connects using the app user via:
```
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/jocks-karaoke
SPRING_DATASOURCE_USERNAME=${MYSQL_APP_USER}
SPRING_DATASOURCE_PASSWORD=${MYSQL_APP_PASSWORD}
```
Flyway migrations run on backend start to initialize/import data.

### Local development stack (HTTP only)
```
cd deploy
docker compose -f docker-compose.dev.yml up -d --build
# Frontend proxied by Caddy on http://localhost:8080
# Backend direct on http://localhost:8081 (per Caddyfile.dev)
# Portainer on http://localhost:8082
```

### Maintenance & common commands (server)
```
cd ~/jocks-karaoke/deploy

# Pull and restart prod stack
docker compose -f docker-compose.yml pull
docker compose -f docker-compose.yml up -d

# Check status and logs
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs --tail=100 caddy backend | cat

# Reload Caddy after Caddyfile changes
docker compose -f docker-compose.yml exec -T caddy caddy reload --config /etc/caddy/Caddyfile

# Reset DB (drops volume; Flyway will reapply migrations)
docker compose -f docker-compose.yml down
docker volume rm $(docker volume ls -q | grep '_mysql-data$') || true
docker compose -f docker-compose.yml up -d
```

## Troubleshooting

### Docker Compose v2 vs v1
- If `docker compose` is unavailable, install the v2 plugin. As a fallback, try `docker-compose` (v1).

### 502 from Caddy
- Check Caddy logs: `docker compose -f deploy/docker-compose.yml logs --tail=100 caddy`
- Ensure services are healthy: `docker compose -f deploy/docker-compose.yml ps`
- Confirm Caddyfile proxies to Docker service names (`frontend:3000`, `backend:9090`).

### MySQL “Host is not allowed” / auth errors
- Ensure `MYSQL_APP_USER` and `MYSQL_APP_PASSWORD` exist in `deploy/.env`.
- The backend uses the app user, not root. Reset the DB volume if needed (see commands above).

### Chrome shows “Not secure (broken HTTPS)” after deploy
- If Incognito is fine, it’s a cached/permission override. In Chrome:
  - Visit `chrome://settings/content/insecureContent` and remove any allow-list for the site.
  - Site settings → Reset permissions, Delete data.
  - DevTools → Application → Unregister service workers, Clear storage → Clear site data.
  - `chrome://restart` to fully restart the browser.

### Architecture warnings when building on Apple Silicon
- The frontend build enforces `--platform linux/amd64`; the Task ensures buildx is used.
- If you see multi-arch errors, run `docker buildx create --use` once locally.

## Where things live
- Reverse proxy: `deploy/Caddyfile`
- Production compose: `deploy/docker-compose.yml`
- Development compose: `deploy/docker-compose.dev.yml`
- Frontend Nginx config (adds HSTS/CSP headers): `frontend/nginx/nginx.conf`
- Task targets: `Taskfile.yml` (`task --list`)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.