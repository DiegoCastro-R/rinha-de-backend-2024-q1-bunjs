# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install bun globally
RUN npm install -g bun

# Install dependencies
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application runs on
EXPOSE $PORT

# Set DATABASE_URL as environment variable
ENV DATABASE_URL $DATABASE_URL

# Command to run the application using bun
CMD ["bun", "start"]
