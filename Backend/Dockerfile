FROM node:16-alpine

WORKDIR /app-backend

COPY package.json .

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3001 
