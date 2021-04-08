FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .
COPY ./libs/splide/splide.js ./node_modules/@splidejs/splide/dist/js/

RUN next build
CMD ["next", "start"]