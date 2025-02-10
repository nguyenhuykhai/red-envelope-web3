# --- Stage 1: Dependencies ---
FROM node:23.7.0-alpine3.20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install
    
# --- Stage 2: Builder ---
FROM node:23.7.0-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
    
# --- Stage 3: Runner ---
FROM node:23.7.0-alpine3.20 AS runner
WORKDIR /app
ENV NODE_ENV production
    
# Copy built assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
    
# Cài đặt production dependencies
RUN npm install --omit=dev
    
EXPOSE 3000
CMD ["npm", "start"]
    