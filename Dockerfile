FROM ubuntu:latest
#FROM node:alpine

RUN apk add python3.8

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .
COPY ./libs/splide/splide.js ./node_modules/@splidejs/splide/dist/js/

CMD ["yarn", "production"]