# Use Node.js LTS version
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm ci --production=false

# Copy the rest of the application
COPY . .

# Ensure data.json exists and has correct permissions
RUN touch data.json && chmod 666 data.json

# Build the Next.js application
RUN npm run build

# Expose the ports the app runs on
EXPOSE 3001 3002

# Set environment variables
ENV LOCAL_IP=192.168.1.143
ENV API_PORT=3002
ENV NEXT_PORT=3001

# Start the application
CMD ["sh", "-c", "npx ts-node server.ts & npm start"]


