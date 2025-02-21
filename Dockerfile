FROM node:18

# Set environment variables
ENV MONGO_DB_USERNAME=admin
ENV MONGO_DB_PASSWORD=qwerty

# volumes:
  # - \Users\Home\OneDrive\Desktop\data:/data/db



# Create the directory
RUN mkdir -p "mongo and mongo express"

# Copy files to the container
COPY . /app

# Set the working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Start app with nodemon
CMD ["npx", "nodemon", "index.js"]
