FROM node:22-bookworm-slim

WORKDIR /app

# Enable and activate pnpm explicitly for Docker builds.
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
