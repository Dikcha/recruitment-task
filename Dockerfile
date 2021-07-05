FROM node:14

COPY . /app
COPY ./wait-for-it.sh /usr/bin/wait-for-it.sh

WORKDIR /app

RUN npm i

RUN npm run build
