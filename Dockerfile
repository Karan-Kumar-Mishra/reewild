# ---------- Base build stage ----------
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json tsconfig.json ./
RUN npm install -g pnpm
RUN pnpm install

# Copy source
COPY src ./src

EXPOSE 3000
# Build TypeScript → dist
RUN pnpm run build

CMD [ "node","dist/server.js"]

