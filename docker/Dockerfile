# Stage 1: Build the application with Bun
FROM oven/bun AS builder
WORKDIR /sonex

# Define build arguments
ARG DATABASE_URL
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

# Set environment variables from build arguments
ENV DATABASE_URL=${DATABASE_URL}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

# Copy package files for both server and web
COPY package.json bun.lockb ./
COPY server/package.json server/
COPY web/package.json web/

# Install dependencies using Bun
RUN bun install --cwd server
RUN bun install --cwd web

# Copy server and web files
COPY server server/
COPY web web/

# Build the frontend
RUN bun run --cwd web build

# Stage 2: Production Image
FROM node:18-bookworm-slim AS runner
WORKDIR /sonex

# Copy the application code and Prisma client
COPY --from=builder /sonex/server ./server
COPY --from=builder /sonex/web/dist ./web

# Install only production dependencies
COPY package*json ./
RUN npm install --production

# Install necessary libraries and updates for container
RUN apt-get update -y && apt-get install -y openssl

# Generate Prisma client
RUN npx prisma generate --schema=server/prisma/schema.prisma

# Expose port for the server to listen on
EXPOSE 4000

# Start the application
CMD ["node", "server/index.js"]
