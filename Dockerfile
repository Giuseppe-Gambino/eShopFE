# syntax=docker/dockerfile:1

# Stage 1: Build the Angular application
FROM node:22.13.1-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY --link package.json package-lock.json ./

# Install dependencies
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the application source code
COPY --link . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the built application using a lightweight web server
FROM nginx:alpine AS final

# Copy the built application from the builder stage
COPY --from=builder /app/dist/e-shop-fe /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]