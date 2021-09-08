FROM mhart/alpine-node:12 AS base
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

ARG BUILD_ENV

COPY . .
COPY .env.${BUILD_ENV:-dev} ./.env
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
