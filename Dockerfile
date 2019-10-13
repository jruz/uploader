FROM node:12.11.1-alpine

COPY . /dist

WORKDIR /dist/app
RUN yarn install --production && yarn prod

WORKDIR /dist/server
RUN yarn install --production

CMD yarn start
