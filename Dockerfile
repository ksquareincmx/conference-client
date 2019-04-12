# Stage 1 - the build process
FROM node:latest as build-deps
RUN mkdir -p /usr/conference-client
WORKDIR /usr/conference-client
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/conference-client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]