Build and deploy the current state of the project to production.

## Environment

- **Production host**: `jocks-karaoke.com`
- **Deploy user**: `allister`
- **Docker Hub org**: `aldoink`
- **Image names**: `aldoink/jocks-karaoke:backend_1.0.0` / `aldoink/jocks-karaoke:frontend_{version}`
- **Frontend version**: read from `frontend/package.json` `.version`
- **Compose file**: `deploy/docker-compose.yml` on the remote server at `~/jocks-karaoke/deploy/`

## Pre-flight checks

Before deploying, confirm:
1. The working tree is clean (`git status`) — all changes should be committed
2. You are on the `main` branch (production deploys from main only)

If either check fails, stop and tell the user what needs to be resolved first.

## Deploy steps

Run these in order using the Taskfile tasks:

```bash
# 1. Build and push backend image
task release:backend-image

# 2. Build and push frontend image
task release:frontend-image

# 3. Ensure remote .env has required secrets (safe to re-run; won't overwrite existing values)
task release:init-remote-env DEPLOY_HOST=jocks-karaoke.com DEPLOY_USER=allister

# 4. Pull new images and restart services on the server
task release:deploy DEPLOY_HOST=jocks-karaoke.com DEPLOY_USER=allister
```

## Post-deploy verification

After the deploy completes, verify the site is up:
```bash
curl -sf https://jocks-karaoke.com > /dev/null && echo "OK" || echo "FAILED"
```

Report the result to the user. If the health check fails, show the last 50 lines of Caddy and backend logs:
```bash
ssh allister@jocks-karaoke.com 'cd ~/jocks-karaoke/deploy && docker compose -f docker-compose.yml logs --tail=50 caddy backend'
```
