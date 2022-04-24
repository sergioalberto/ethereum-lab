FROM node:14.17.3-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY SupplyChainWeb3Client/package.json ./
COPY SupplyChainWeb3Client/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY SupplyChainWeb3Client/ ./

RUN CI=true yarn test -- --coverage

RUN CI=true yarn build

EXPOSE 3000

CMD ["yarn", "start"]
