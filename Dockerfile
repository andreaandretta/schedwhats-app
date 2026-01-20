# ============================================================================
# DOCKERFILE PER NEXT.JS 14 SU COOLIFY
# Approccio semplificato: Usa Node.js standalone per servire l'app
# ============================================================================

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy sorgenti
COPY . .

# Build Next.js
RUN npm run build

# ============================================================================
# PRODUCTION STAGE
# ============================================================================

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Expose porta 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

  # Start Next.js server
  CMD ["npm", "start"]