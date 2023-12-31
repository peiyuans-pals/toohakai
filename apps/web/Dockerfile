FROM node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Install pnpm
RUN corepack enable
# RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SHELL="/bin/bash"
RUN pnpm setup

# Set working directory
WORKDIR /app
RUN pnpm --global add turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

# Install pnpm
RUN corepack enable
# RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SHELL="/bin/bash"
RUN pnpm setup

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

ARG NEXT_PUBLIC_TOOHAKAI_API_URL
ENV NEXT_PUBLIC_TOOHAKAI_API_URL=$NEXT_PUBLIC_TOOHAKAI_API_URL

RUN echo NEXT_PUBLIC_TOOHAKAI_API_URL=$NEXT_PUBLIC_TOOHAKAI_API_URL

ARG NEXT_PUBLIC_DEPLOYMENT_DOMAIN
ENV NEXT_PUBLIC_DEPLOYMENT_DOMAIN=$NEXT_PUBLIC_DEPLOYMENT_DOMAIN

RUN echo NEXT_PUBLIC_DEPLOYMENT_DOMAIN=$NEXT_PUBLIC_DEPLOYMENT_DOMAIN

ARG NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL

RUN echo NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL

ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN echo NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL

RUN pnpm turbo run build --filter=web...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# workaround for a nextjs bug: https://github.com/vercel/next.js/issues/54133
ENV HOSTNAME "0.0.0.0"

CMD node apps/web/server.js

EXPOSE 3000

# HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1
