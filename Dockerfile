FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY  . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]