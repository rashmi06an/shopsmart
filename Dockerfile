# Lightweight base image
FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy only package files first (cache optimization)
COPY package*.json ./

# Install dependencies (faster)
RUN npm install --omit=dev

# Copy rest of code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]