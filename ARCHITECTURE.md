# Architecture Overview

This document describes the architecture of the Jock's Karaoke project, including the frontend, backend, and deployment infrastructure.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Load Balancer                            │
│                       (Caddy Reverse Proxy)                      │
│  ┌──────────────────────┐    ┌────────────────────────────────┐ │
│  │  www.jocks-karaoke   │    │  backend.jocks-karaoke         │ │
│  │      .com            │    │                                 │ │
│  └──────────────────────┘    └────────────────────────────────┘ │
│                              │                                    │
│                  ┌───────────┴───────────┐                       │
│                  │                       │                       │
│          ┌───────▼────────┐    ┌────────▼──────┐              │
│          │  Frontend      │    │   Backend API │              │
│          │ (React + TS)   │    │ (Spring Boot) │              │
│          │ Container      │    │ Container     │              │
│          │   :3000        │    │ Container     │              │
│          └────────────────┘    └───────────────┘              │
│                              │                                    │
│                  ┌───────────┴───────────┐                       │
│                  │                       │                       │
│          ┌───────▼────────┐    ┌────────▼──────┐              │
│          │  MySQL         │    │  Portainer    │              │
│          │ (MySQL DB)     │    │ (Management)  │              │
│          │ Container      │    │ Container     │              │
│          └────────────────┘    └───────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (`/frontend`)
- **Framework:** React 17 with TypeScript
- **Build Tool:** Create React App
- **Styling:** Emotion CSS-in-JS
- **State Management:** React Context API
- **Routing:** React Router v6

| Component Type | Location | Description |
|----------------|----------|-------------|
| Atoms | `/src/atoms/` | Reusable low-level components (Button, Input, Modal) |
| Molecules | `/src/molecules/` | Combinations of atoms forming partial UI |
| Organisms | `/src/organisms/` | Larger composed components (NavBar, HamburgerMenu) |
| Components | `/src/components/` | Presentational components |
| Pages | `/src/pages/` | Full-page components (Home) |

### Backend (`/backend`)
- **Framework:** Spring Boot 2.5.1
- **Language:** Kotlin
- **Database Access:** Spring Data JPA (Hibernate)
- **Database:** MySQL
- **Security:** Spring Security with JWT authentication
- **Migrations:** Flyway

### Infrastructure
- **Reverse Proxy:** Caddy (automatic HTTPS)
- **Container Orchestration:** Docker Compose v2
- **Development:** Gradle (Kotlin/Java tooling)
- **Testing:** Jest (frontend), Spock (backend)

## Data Flow

### Authentication Flow
```
1. User enters credentials on login page
2. Frontend sends POST to /api/auth/login
3. Backend validates credentials against MySQL
4. Backend generates JWT token
5. Frontend stores JWT in sessionStorage
6. Subsequent requests include JWT in Authorization header
```

### Song Search Flow
```
1. User searches for songs on frontend
2. Frontend calls /api/songs endpoint
3. Backend queries MySQL database
4. Backend returns song list with metadata
5. Frontend renders results
```

### High Score Flow
```
1. User enters name and score
2. Frontend calls POST /api/high-scores
3. Backend validates and saves to MySQL
4. Frontend fetches updated high scores list
5. Frontend displays leaderboard
```

## Database Schema

The database is managed by Flyway migrations in `/backend/src/main/resources/db/migration/`.

### Main Tables
- `sessions` - User session storage
- `high_scores` - Player score records
- Additional tables created by Flyway migrations

## Directory Structure

```
jocks-karaoke/
├── backend/
│   ├── src/main/kotlin/com/jockskaraoke/
│   │   ├── config/          # Spring configuration classes
│   │   ├── controllers/     # REST API endpoints
│   │   ├── models/          # JPA entity classes
│   │   ├── repositories/    # Data access layer
│   │   ├── services/        # Business logic
│   │   └── security/        # Authentication/authorization
│   ├── src/main/resources/
│   │   ├── application.yml  # Application configuration
│   │   └── db/migration/    # Flyway SQL migrations
│   └── build.gradle.kts     # Gradle build script
│
├── frontend/
│   ├── src/
│   │   ├── atoms/          # Atoms (reusable primitives)
│   │   ├── molecules/      # Molecules (component combinations)
│   │   ├── organisms/      # Organisms (complex components)
│   │   ├── components/     # Presentational components
│   │   ├── contexts/       # Context providers (Auth, Song, HighScore)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── models/         # TypeScript model definitions
│   │   ├── services/       # API service layer
│   │   ├── pages/          # Full page components
│   │   ├── theme/          # Emotion theme configuration
│   │   └── scss/           # SCSS stylesheets
│   └── package.json        # Dependencies and scripts
│
├── deploy/
│   ├── Caddyfile           # Caddy reverse proxy config
│   ├── docker-compose.yml  # Production Docker Compose
│   └── docker-compose.dev.yml  # Development Docker Compose
│
└── Taskfile.yml            # Task runner for deployment commands
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login and receive JWT |
| POST | `/api/auth/register` | Register new user |

### Songs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs` | Search and list songs |
| GET | `/api/songs/{id}` | Get song details |

### High Scores
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/high-scores` | Get leaderboard |
| POST | `/api/high-scores` | Submit new score |

## Deployment Model

The project uses a multi-container Docker Compose deployment:

| Service | Port | Description |
|---------|------|-------------|
| caddy | 80/443 | Reverse proxy with HTTPS |
| frontend | 3000 | React application |
| backend | 9090 | Spring Boot API |
| mysql | 3306 | MySQL database |
| portainer | 9000 | Docker management UI |

See [deploy/docker-compose.yml](deploy/docker-compose.yml) for full configuration.

## Security Considerations

- JWT-based authentication
- Spring Security configured for token-based auth
- CORS configured for frontend-backend communication
- Environment variables for sensitive data (`.env`)
- HTTPS enforced by Caddy in production