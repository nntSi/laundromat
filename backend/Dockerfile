FROM node:18.16.0-alpine

WORKDIR /usr/app/backend

COPY ./package*.json ./
RUN npm install

COPY . .
RUN npx prisma migrate dev --name init
RUN npx prisma generate
RUN npm run build

# EXPOSE Port
EXPOSE 3000

# Deploy app for local development
CMD ["npm", "run", "start"]