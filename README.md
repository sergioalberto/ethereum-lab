# Ethereum-Lab
Ethereum laboratory where you can find some examples of dapps

## Set up
- Download `Ganache` (it is a test blockchain that helps with deploying smart contracts, developing applications, and running tests): http://trufflesuite.com/ganache/
- Open `Ganache` and create a quick workspace
- Install `truffle`: ``` npm install truffle -g ```

```
truffle version
# Create a new project inside an empty folder
truffle init
truffle create contract YourContractName
truffle create test YourTestName

truffle compile
truffle build
truffle migrate

# Deploy your smart contract code
truffle deploy --reset

# Connect to 'development' network
truffle console
```

##  Build and run the client with Docker
```shell
# Dev
docker build -f Dockerfile -t supply-chain-dapp-dev .
docker run -it -p 3000:3000 supply-chain-dapp-dev
docker-compose up -d
docker-compose down -v

#Prod
docker build -f Dockerfile.prod -t supply-chain-dapp .
docker run -it -p 3000:80 supply-chain-dapp
```
