# --- ÉTAPE 1 : BUILD ---
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apk add --no-cache openssl

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

COPY apps ./apps


RUN pnpm install --frozen-lockfile --filter=api 

RUN cd apps/api && pnpm prisma generate

RUN pnpm --filter=api build

FROM node:20-alpine AS production

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk add --no-cache openssl

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile --filter=api --prod

COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules


COPY --from=builder --chown=nestjs:nodejs /app/apps/api ./apps/api

USER nestjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "apps/api/dist/src/main.js"]