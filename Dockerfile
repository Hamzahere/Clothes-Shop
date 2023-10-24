FROM node:16.17.1-alpine AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

# Copy the built app to the NGINX web server directory
COPY --from=build /app/dist  /usr/share/nginx/html

EXPOSE 4200
# required for docker desktop port mapping

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]