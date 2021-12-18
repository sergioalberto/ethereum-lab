# MetaCoin

```
# Launch Ganache, and then:
truffle init
truffle create contract HelloWorld
truffle migrate

truffle test

truffle console
> const instance = await HelloWorld.deployed()
> instance.getHelloMessage()
```

Note: You can exit truffle session with `.exit` or `ctrl-D`. 

## Other commands
```
truffle compile
truffle build

# Deploy your smart contract code
truffle deploy --reset

# Connect to 'development' network
truffle console
> HelloWorld.deployed().then(function (instance) {return instance});
> let instance = await HelloWorld.deployed()

truffle network

truffle develop
> deploy --reset
```

#### Reference:
- https://www.ludu.co/course/ethereum/truffle
- https://github.com/dharmeshkakadia/truffle-hello-world
