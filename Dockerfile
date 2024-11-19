FROM oven/bun AS builder
WORKDIR /app

ENV NODE_ENV=production

COPY package.json bun.lockb ./
COPY server/package.json server/package.json
COPY web/package.json web/package.json

RUN bun install --cwd server
RUN bun install --cwd web

COPY server ./server
COPY web ./web

RUN bun run --cwd web build

# Production image, copy all the files and run next
FROM node:18-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/server ./server
COPY --from=builder /app/web/dist ./web

COPY package*json ./
RUN npm install --production

EXPOSE 4000

CMD ["node", "server/index.js"]