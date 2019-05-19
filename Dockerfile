FROM node:12
WORKDIR /app
CMD ls -ltr && npm install && npm start
