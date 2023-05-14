FROM node:18

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 80

CMD ["npm","start"]