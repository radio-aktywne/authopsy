ARG NODE_IMAGE_TAG=17.5.0-alpine3.15

# Install dependencies only when needed
FROM node:$NODE_IMAGE_TAG AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ./authopsy/package.json ./authopsy/package-lock.json ./
RUN npm ci --only-production

# Rebuild the source code only when needed
FROM node:$NODE_IMAGE_TAG AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./authopsy/ ./

RUN npm run build

# Production image, copy all the files and run next
FROM node:$NODE_IMAGE_TAG AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/start.sh ./start.sh

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chmod +x ./start.sh

ENV PORT=25000 \
    NEXT_TELEMETRY_DISABLED=1 \
    AUTHOPSY_AUTHE_URL=https://localhost:23000 \
    AUTHOPSY_AUTHE_ADMIN_URL=https://localhost:23001

EXPOSE 25000

ENTRYPOINT ["./start.sh"]
CMD []
