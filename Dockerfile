# ---------- Base build stage ----------
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy source
COPY src ./src

# Build TypeScript → dist
RUN npm run build


# ---------- Production stage ----------
FROM node:20-slim AS runner

WORKDIR /app

# Copy only built code + node_modules (smaller image)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Expose port (match your config.PORT)
EXPOSE 4000

# Run the compiled server
CMD ["node", "dist/server.js"]
