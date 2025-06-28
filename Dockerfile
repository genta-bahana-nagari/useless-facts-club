# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project
COPY . .

# Expose default Next.js port
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]
