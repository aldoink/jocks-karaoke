# Jock's Karaoke - Deployment & Development Guide

## 🚀 Quick Start

This project uses Docker Compose for containerized deployment with Caddy as the reverse proxy.

### Production Deploy (HTTPS)

```bash
cd deploy
export MYSQL_ROOT_PASSWORD=<set-secure-password>
export JWT_SECRET=$(openssl rand -hex 32)
docker compose up -d --build
```

### Local Development

```bash
cd deploy
docker compose -f docker-compose.dev.yml up -d
# Frontend: http://localhost:8080
# Backend: http://localhost:8081
# Portainer: http://localhost:8082
```

## 🔧 Quick Development Commands

### Build Backend
```bash
./gradlew :backend:build
```

### Run Backend Locally
```bash
./gradlew :backend:bootRun
```

### Build Frontend
```bash
cd frontend && yarn build
```

### Run Frontend Locally
```bash
cd frontend && yarn start
```

## 🐳 Deployment Tasks

The `Taskfile.yml` provides convenient deployment commands:

```bash
# List available tasks
task --list

# Build and push backend image
task release:backend-image

# Build and push frontend image
task release:frontend-image

# One-command release (build+push, init env, deploy)
task release:all \
  BACKEND_URL=https://backend.jocks-karaoke.com \
  PUBLIC_URL=https://jocks-karaoke.com \
  DEPLOY_HOST=jocks-karaoke.com \
  DEPLOY_USER=allister
```

## 🔐 Environment Variables

### Production (.env)
- `MYSQL_ROOT_PASSWORD` - MySQL root password
- `JWT_SECRET` - JWT authentication secret
- `MYSQL_APP_USER` - Application database user
- `MYSQL_APP_PASSWORD` - Application database password

### Local Development (.env.dev)
- Use `.env.dev` for local development with less strict secrets

## 🐛 Troubleshooting

### 502 Bad Gateway (Caddy)
```bash
docker compose -f docker-compose.yml logs --tail=100 caddy
docker compose -f docker-compose.yml ps
```

### Database Connection Errors
```bash
docker compose -f docker-compose.yml logs mysql
```

### Reload Caddy After Config Changes
```bash
docker compose -f docker-compose.yml exec -T caddy caddy reload --config /etc/caddy/Caddyfile
```

### Reset Database (Use with Caution)
```bash
docker compose -f docker-compose.yml down
docker volume rm $(docker volume ls -q | grep '_mysql-data$') || true
docker compose -f docker-compose.yml up -d
```

## 📂 Project Structure

```
jocks-karaoke/
├── backend/          # Spring Boot + Kotlin API
├── frontend/         # React + TypeScript UI
├── deploy/           # Docker Compose & deployment configs
│   ├── Caddyfile     # Reverse proxy configuration
│   ├── docker-compose.yml      # Production stack
│   └── docker-compose.dev.yml  # Development stack
└── Taskfile.yml      # Task runner for deployment commands
```

## 📚 Additional Documentation

- [WordPress Setup Guide](deploy/WORDPRESS_SETUP.md) - For IndustryPlants WordPress deployment
- [Taskfile](Taskfile.yml) - All available deployment and development tasks

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

Copyright © Jock's Karaoke