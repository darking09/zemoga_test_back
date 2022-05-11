FROM node:14.19.1-buster as zemoga_test_back

RUN apt-get update

RUN apt-get install libcurl4-openssl-dev

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

FROM zemoga_test_back as production

ENV NODE_PATH=./build

RUN yarn build
