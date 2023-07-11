FROM node:16-alpine

WORKDIR /code

COPY ./package.json /code/package.json

RUN npm install

COPY ./ /code

CMD npm run dev