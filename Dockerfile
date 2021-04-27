FROM ubuntu:latest
#FROM node:alpine

RUN apt-get update
RUN apt-get install python3.6

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .
COPY ./libs/splide/splide.js ./node_modules/@splidejs/splide/dist/js/

CMD ["yarn", "production"]