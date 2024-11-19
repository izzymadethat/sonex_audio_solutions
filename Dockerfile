# Stage 1: Build the application with Bun
FROM oven/bun AS builder
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files for both server and web
COPY package.json bun.lockb ./
COPY server/package.json server/package.json
COPY web/package.json web/package.json

# Install dependencies using Bun
RUN bun install --cwd server
RUN bun install --cwd web

# Copy server and web files
COPY server ./server
COPY web ./web

# Build the frontend
RUN bun run --cwd web build

# # Generate Prisma client
# RUN bun run --cwd server prisma generate --schema=server/prisma/schema.prisma 

# Stage 2: Production Image
FROM node:18-bookworm-slim AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy the application code and Prisma client
COPY --from=builder /app/server ./server
COPY --from=builder /app/web/dist ./web

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
