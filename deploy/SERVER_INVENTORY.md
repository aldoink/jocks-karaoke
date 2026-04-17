# Server Inventory — jocks-karaoke.com

Last audited: 2026-04-17

## Host

| Property | Value |
|----------|-------|
| Host | jocks-karaoke.com |
| OS | Debian (kernel 4.19.0-16-amd64) |
| CPUs | 1 vCPU |
| RAM | 1.9 GB total, ~115 MB available |
| Disk | 19 GB total, 11 GB used (57%), 7.7 GB free |
| Shell user | allister |

> **Note:** RAM is very tight. Running a staging stack alongside production on this host is not practical without an upgrade or pruning dead images.

## Running Containers (Production)

All live containers are in the `deploy_default` bridge network, managed from `~/jocks-karaoke/deploy/docker-compose.yml`.

| Container | Image | Uptime | Ports / Exposure |
|-----------|-------|--------|-----------------|
| `deploy-caddy-1` | `caddy:2` | 4 months | 0.0.0.0:80, 0.0.0.0:443 |
| `deploy-frontend-1` | `aldoink/jocks-karaoke:frontend_2.0.0` | 4 months | internal :3000 |
| `deploy-backend-1` | `aldoink/jocks-karaoke:backend_1.0.0` | 8 days | internal :9090 |
| `deploy-mysql-1` | `mysql:8.0` | 4 months (healthy) | internal :3306 |
| `deploy-wordpress-1` | `wordpress:latest` | 4 months | internal :80 |
| `deploy-wordpress-db-1` | `mysql:8.0` | 4 months (healthy) | internal :3306 |
| `deploy-portainer-1` | `portainer/portainer-ce:2.11.1` | 4 months | internal :9000 |

## Exited / Dead Containers

| Container | Image | Status |
|-----------|-------|--------|
| `oldUI` | `aldoink/jocks-karaoke:frontend_1.0.0` | Exited 7 months ago |
| `portainer` | `portainer/portainer-ce` (old) | Exited 7 months ago |
| `caddy` | old caddy image | Exited 7 months ago |

These can be pruned safely (`docker container prune`).

## Docker Images

Current in-use images:
- `aldoink/jocks-karaoke:backend_1.0.0`
- `aldoink/jocks-karaoke:frontend_2.0.0`
- `wordpress:latest`
- `mysql:8.0`
- `caddy:2`
- `portainer/portainer-ce:2.11.1`

Notable unused images:
- `aldoink/jocks-karaoke:frontend_3.0.0` — built but never deployed (1.22 GB, tagged but not in compose)
- Many untagged `<none>` images from old builds — candidates for `docker image prune`

## Volumes

| Volume | Purpose |
|--------|---------|
| `deploy_mysql-data` | App database (MySQL) |
| `deploy_caddy-data` / `deploy_caddy-config` | Caddy TLS certs + config |
| `deploy_wordpress-data` | WordPress files |
| `deploy_wordpress-db-data` | WordPress database |
| `deploy_portainer-data` | Portainer state |

## Directory Layout on Server

```
~/jocks-karaoke/           ← repo clone (last updated Dec 2025)
  deploy/
    Caddyfile              ← active Caddyfile (used by running caddy container)
    Caddyfile.dev
    docker-compose.yml     ← production compose file
    docker-compose.dev.yml
    .env                   ← secrets (MYSQL_ROOT_PASSWORD, JWT_SECRET, etc.)
    WORDPRESS_SETUP.md
    wordpress-theme/

~/caddy/                   ← old/legacy Caddyfile, no longer active
~/mysql/                   ← old directory, not in use
~/portainer/               ← old directory, not in use
~/frontend_3.0.0           ← 446 MB mystery file in home dir, can likely be deleted
```

## Routing (Active Caddyfile)

Caddy routes all traffic via the `deploy/Caddyfile`:

| Domain | Upstream |
|--------|----------|
| `jocks-karaoke.com`, `www.jocks-karaoke.com` | frontend (:3000) + backend (:9090 via `/api`) |
| `wordpress.jocks-karaoke.com` | wordpress (:80) |
| `portainer.jocks-karaoke.com` | portainer (:9000) |

(See actual `deploy/Caddyfile` for full rules.)

## Staging Environment

**No staging environment is running or configured on this server.**

The `feature/staging-infra` branch contains staging compose files and a CD pipeline but has not been merged or deployed. Given the server's RAM constraints (1.9 GB total), running staging alongside production would require either:
1. A separate staging server, or
2. Upgrading the current server's RAM before deploying staging.

## Recommended Cleanup

- `docker container prune` — remove 3 exited containers
- `docker image prune` — reclaim space from many untagged `<none>` images
- Delete `~/frontend_3.0.0` (446 MB file in home dir)
- Decide on `frontend_3.0.0` image — deploy it or remove it
