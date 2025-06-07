# Use a base image with Node and yarn
FROM node:20

# Create and set the app directory
WORKDIR /app

# Copy package manifests first
COPY package.json yarn.lock ./
COPY packages/api/package.json ./packages/api/package.json
COPY packages/core/package.json ./packages/core/package.json

# Install all dependencies
RUN yarn install

# Copy the full monorepo source
COPY . .

# Set environment
ENV NODE_ENV=development

# Build all packages
RUN yarn workspaces run build

# Expose the port your Express app uses
EXPOSE 3000

# Run the dev script (you can change to production script for deploy)
CMD ["yarn", "workspace", "@app/api", "dev"]
