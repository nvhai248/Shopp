# Use the official Node.js image as a base
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Install wait-for-it script
RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller Node.js runtime image for the final stage
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the wait-for-it script from the build stage
COPY --from=build /usr/local/bin/wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Copy only the built application and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:prod"]
