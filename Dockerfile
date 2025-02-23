# Stage 1: Build the Angular App
FROM node:alpine AS builder

WORKDIR /usr/src/app

# Copy the application source code into the container
COPY . /usr/src/app

# Install Angular CLI and project dependencies globally and locally
RUN npm install -g @angular/cli
RUN npm install

# Define a build argument to allow passing a configuration
ARG CONFIGURATION=production

# Build the Angular app using the specified configuration
RUN ng build --configuration $CONFIGURATION

# Stage 2: Serve the Angular App with ng serve
FROM node:alpine

WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Install Angular CLI globally in the final image
RUN npm install -g @angular/cli

# Install dependencies again (if needed for serving)
RUN npm install

# Expose the port Angular will run on (default is 4200)
EXPOSE 4200

# Start the Angular app with ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]
