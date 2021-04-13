FROM node:12

WORKDIR /graphql

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000

RUN yarn transpile

CMD ["yarn", "deploy"]
