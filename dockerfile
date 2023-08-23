# Use the official Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY src/ ./src/

# Expose the port the app runs on (7755 in this case)
EXPOSE 7755

# Command to run the application (adjust as needed)
CMD ["npm", "start"]
