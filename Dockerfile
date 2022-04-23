FROM node:14.17.3-stretch

WORKDIR /app

COPY SupplyChainWeb3Client/package.json ./
COPY SupplyChainWeb3Client/ ./

RUN npm i

RUN CI=true npm test -- --coverage

RUN CI=true npm run build

RUN npm install serve -g --force
CMD ["serve", "-s", "build"]
