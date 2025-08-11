# syntax=docker/dockerfile:1.3
FROM oven/bun:1 AS installer
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
ENV CACHE_FOLDER=/root/.bun/install/cache
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=${CACHE_FOLDER} BUN_CACHE=${CACHE_FOLDER} \
    bun install --frozen-lockfile

FROM node:lts-slim AS builder
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM alpine:3.21 AS user
ENV USER=docker
ENV UID=1001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "$UID" \
    "$USER"

FROM debian:stable-slim AS production
WORKDIR /app
COPY --from=user /etc/passwd /etc/passwd
COPY --from=user /etc/group /etc/group

COPY --from=builder /app/app ./app

USER docker
EXPOSE 8080
ENTRYPOINT ["./app"]
CMD []