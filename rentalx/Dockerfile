FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g ts-node-dev

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]