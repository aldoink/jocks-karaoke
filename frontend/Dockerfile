FROM node:latest as build
WORKDIR /app
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