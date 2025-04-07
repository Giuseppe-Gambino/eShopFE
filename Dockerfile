# Stage 1: build Angular app
FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve con nginx
FROM nginx:alpine
COPY --from=builder /app/dist/e-shop-fe/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
