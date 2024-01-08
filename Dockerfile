FROM node:16.19.0-alpine3.17

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn migrate

RUN npx prisma generate

RUN yarn build

EXPOSE 80

ENTRYPOINT ["yarn", "start"]
