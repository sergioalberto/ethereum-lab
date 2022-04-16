FROM node:14.17.3-stretch

WORKDIR /app

COPY SupplyChainWeb3Client/package.json ./
COPY SupplyChainWeb3Client/ ./

RUN npm i

CMD ["npm", "run", "start"]
