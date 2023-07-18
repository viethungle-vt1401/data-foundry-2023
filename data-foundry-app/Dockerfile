FROM node:16-alpine

WORKDIR /code

COPY ./package.json /code/package.json

RUN npm install

COPY ./ /code

CMD npm run dev

RUN chgrp -R 0 /code && \
    chmod ug+w -R /code && \
    mkdir /.npm && \
    chgrp -R 0 /.npm && \
    chmod ug+w -R /.npm

USER 1000