##
## Dockerfile for building the React frontend.
##
## Changes made:
## - Accepts REACT_APP_BACKEND_URL as a build arg and exports it so CRA bakes it into the bundle
## - No runtime changes; still served via nginx
##
## @LLM_USAGE Fully LLM generated.

FROM --platform=linux/amd64 node:16.13.0 as build
WORKDIR /app

# Provide backend URL at build time for CRA (REACT_APP_*)
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn --silent
COPY . /app/
RUN yarn build

FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]