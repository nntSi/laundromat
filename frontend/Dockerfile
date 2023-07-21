# Pull the base image
FROM node:18.16.0-alpine
# Set The Work Dir
WORKDIR /usr/app/frontend

# Copy app dependencies to container
COPY ./package*.json ./

# Install dependencies
#RUN npm config set legacy-peer-deps true
#RUN npm cache clean --force
RUN npm install
RUN npm install @line/liff

# Copy code from host to container
COPY . .

# Deploy
RUN npm run build

# EXPOSE Port
EXPOSE 4173

# Run app
CMD [ "npm", "run", "preview" ]

