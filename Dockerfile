FROM node:14.19.1 as zemoga_test_back

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

COPY . .

FROM zemoga_test_back as production

ENV NODE_PATH=./build

RUN yarn build
