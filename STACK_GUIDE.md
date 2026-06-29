# Backend Stack Guide

This backend is a NestJS app managed with `pnpm`. The Docker setup in this folder is configured for development, so running Docker Compose starts the API, Postgres, Redis, pgAdmin, and Redis Insight together.

Docker Compose reads values from [backend/.env](/D:/app/tracking/backend/.env:1), so ports and credentials are managed from environment variables instead of being hardcoded in the compose file.

## One command to run everything

From the `backend` folder:

```bash
docker compose up --build
```

If you prefer a package script, use:

```bash
pnpm run docker:dev
```

## Environment-driven Docker config

The compose file uses variables from [backend/.env](/D:/app/tracking/backend/.env:1) for:

- `PORT`: backend API port
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`: PostgreSQL setup
- `REDIS_PORT`: Redis port
- `PGADMIN_DEFAULT_EMAIL`, `PGADMIN_DEFAULT_PASSWORD`, `PGADMIN_PORT`: pgAdmin login and port
- `REDIS_INSIGHT_PORT`: Redis Insight port

That means you can change local ports or credentials without editing [backend/docker-compose.yml](/D:/app/tracking/backend/docker-compose.yml:1).

## Hot reload behavior

The `api` container mounts the local `backend` folder into `/app` and runs:

```bash
pnpm run start:dev
```

That uses the NestJS watcher, which behaves like `nodemon` for this backend. When you change backend source files, only the backend process restarts inside the `api` container. Postgres, Redis, pgAdmin, and Redis Insight keep running.

## Services in Docker Compose

- `api`: NestJS backend running on port `3000`
- `postgres`: PostgreSQL database on port `5432`
- `redis`: Redis server on port `6379`
- `pgadmin`: PostgreSQL admin UI on port `5050`
- `redis-insight`: Redis admin UI on port `5540`

## Core framework

- `@nestjs/common`: Core NestJS decorators, providers, guards, and framework utilities.
- `@nestjs/core`: Bootstraps the NestJS application and dependency injection container.
- `@nestjs/platform-express`: Runs NestJS on top of Express.
- `reflect-metadata`: Required by NestJS and TypeScript decorators.
- `rxjs`: Used by NestJS internally and for reactive flows.

## Configuration and validation

- `@nestjs/config`: For environment-based configuration and app settings.
- `class-transformer`: Converts plain request data into typed DTO objects.
- `class-validator`: Validates DTOs for incoming request payloads.

## API docs and HTTP tooling

- `@nestjs/swagger`: Generates Swagger/OpenAPI docs from NestJS decorators.
- `swagger-ui-express`: Serves the Swagger UI in an Express-based NestJS app.

## Authentication and security

- `@nestjs/passport`: Integrates Passport strategies into NestJS.
- `passport`: Authentication middleware foundation.
- `passport-jwt`: JWT strategy support for protected routes.
- `bcrypt`: Password hashing for user authentication.

## Database

- `postgres`: PostgreSQL client for Node.js.
- `drizzle-orm`: Type-safe ORM for working with PostgreSQL.

## Queues and background jobs

- `bullmq`: Redis-backed job queue for background processing.
- `@nestjs/bullmq`: NestJS integration for BullMQ.
- `ioredis`: Redis client used directly and commonly used with BullMQ.

## Logging

- `pino`: Fast structured JSON logger.
- `nestjs-pino`: NestJS integration for request and app logging.
- `pino-pretty`: Human-readable log output in development.

## Realtime

- `@nestjs/websockets`: NestJS WebSocket module.
- `@nestjs/platform-socket.io`: Socket.IO platform adapter for NestJS.
- `socket.io`: Realtime server implementation.

## Build, lint, and test

- `@nestjs/cli`: NestJS CLI for running and building the project.
- `@nestjs/schematics`: Code generation support for NestJS CLI.
- `typescript`: TypeScript compiler.
- `ts-node`: Runs TypeScript directly in Node-based tooling.
- `ts-loader`: TypeScript loader used in some build flows.
- `tsconfig-paths`: Supports path aliases at runtime.
- `source-map-support`: Better stack traces mapped back to TypeScript.
- `eslint`: Linting engine.
- `@eslint/js`: ESLint JavaScript rules package.
- `@eslint/eslintrc`: Compatibility utilities for ESLint config.
- `typescript-eslint`: TypeScript linting support.
- `eslint-config-prettier`: Disables lint rules that conflict with Prettier.
- `eslint-plugin-prettier`: Runs Prettier as part of linting.
- `prettier`: Code formatter.
- `jest`: Test runner.
- `ts-jest`: Jest transformer for TypeScript.
- `@nestjs/testing`: NestJS testing utilities.
- `supertest`: HTTP testing library for endpoint tests.
- `globals`: Shared global definitions for linting configuration.
- `@types/express`: TypeScript types for Express.
- `@types/jest`: TypeScript types for Jest.
- `@types/node`: TypeScript types for Node.js.
- `@types/supertest`: TypeScript types for Supertest.

## Database tooling

- `drizzle-kit`: CLI tooling for Drizzle schema generation and migrations.

## Important note about current code

Right now, the code in `src` is still the default Nest starter app. That means many libraries in `package.json` are installed for planned features, but are not yet actively used in the current source code.
