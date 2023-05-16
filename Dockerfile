FROM node:18

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD [ "npm", "start" ]