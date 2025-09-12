# Getting Started with Create React App

# Deployment with Docker (Caddy, Backend, Frontend, MySQL, Portainer)

This repository now includes a containerized deployment using Caddy as the reverse proxy, plus a local development stack.

Changes made:
- Added `deploy/docker-compose.yml` and `deploy/Caddyfile` for production
- Added `deploy/docker-compose.dev.yml` and `deploy/Caddyfile.dev` for local testing

@LLM_USAGE Fully LLM generated.

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