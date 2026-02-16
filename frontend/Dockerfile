# Build Image stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Run Image stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies (including dev dependencies for development)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port (Vite default port)
EXPOSE 5173

# Start the development server
CMD ["yarn", "frontend:run"]
