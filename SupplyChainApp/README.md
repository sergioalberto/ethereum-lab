# Supply Chain App
A real word supply chain using Ethereum blockchain app.
Write 2 smart contracts: one to define a token for payment and another for asset tracking and management.

_Note:_ You should create a `.secret` file with your 12 secret words from MetaMask wallet.

## Set up
- Download `Ganache` (it is a test blockchain that helps with deploying smart contracts, developing applications, and running tests): http://trufflesuite.com/ganache/
- Open `Ganache` and create a quick workspace

```
truffle compile
truffle build
truffle migrate

# Deploy your smart contract code
truffle deploy --reset

# Connect to 'development' network
truffle console
truffle console --network ropsten

> const instance = await supplyChain.deployed()
> instance

> instance.addParticipant("A","passA","0x05eea99bAb71D6aF93609bA3a48E6A508104CD3A","Manufacturer")
// Get participant details
> instance.getParticipant(0)

> instance.addParticipant("B","passB","0x1F796b8489507c8204aBcDb8bE057F4C15971B00","Supplier")
> instance.addParticipant("C","passC","0x70A269a6e793844137E68e8105Bfa0417c089952","Consumer")

> instance.addProduct(0, "ABC", "100", "123", 11)
// Get product details
> instance.getProduct(0)

> instance.addProduct(0, "DEF", "101", "456", 12)
> instance.addProduct(1, "GHI", "200", "789", 13, {from: "0x1F796b8489507c8204aBcDb8bE057F4C15971B00"}); // The product will not add because the participant is not 'Manufacturer'
> instance.addProduct(0, "JKL", "201", "135", 14, {from: "0x05eea99bAb71D6aF93609bA3a48E6A508104CD3A"})

// Move products along supply chain: Manufacturer=> Supplier
> instance.newOwner(0, 1, 0, {from: "0x05eea99bAb71D6aF93609bA3a48E6A508104CD3A"})
> instance.getProvenance(0)
```

Note: You can exit truffle session with `.exit` or `ctrl-D`.

```shell
// truffle create test [contract name]
truffle create test SupplyChain

truffle test
```

## Connect to [Infura](https://infura.io)
```shell
npm install @truffle/hdwallet-provider
```
More info about it [here](https://trufflesuite.com/guides/using-infura-custom-provider/)

## Deploy to Popsten
```shell
truffle compile -all --network ropsten

# Note: With `--reset` you will remove EVERYTTHING and re-deploy again
truffle deploy --network ropsten --reset
```
