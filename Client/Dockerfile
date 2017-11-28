FROM node:boron

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
