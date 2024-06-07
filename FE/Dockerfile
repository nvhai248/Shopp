FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN ls -al /app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable to disable linting during build
ENV NEXT_DISABLE_ESLINT true


# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
