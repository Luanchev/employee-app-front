FROM node:18-alpine AS build-step

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/employee-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf