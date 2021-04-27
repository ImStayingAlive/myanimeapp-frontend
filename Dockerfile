FROM node:alpine

RUN apt-get update && apt-get install -y \
    python-qt4 \
    python-pyside \
    python-pip \
    python3-pip \
    python3-pyqt5

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .
COPY ./libs/splide/splide.js ./node_modules/@splidejs/splide/dist/js/

CMD ["yarn", "production"]