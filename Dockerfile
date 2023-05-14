FROM node:18

WORKDIR /backend

COPY . .

RUN npm install

ENV PORT 80
ENV NODE_ENV production

EXPOSE 80

CMD ["npm","start"]
