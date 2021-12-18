# MetaCoin

```
# Launch Ganache, and then:
truffle migrate

# Connect to 'development' network
truffle console
> let instance = await MetaCoin.deployed()
> let accounts = await web3.eth.getAccounts()
> let balance = await instance.getBalance(accounts[0])
> balance.toNumber()
```

Reference:
- https://trufflesuite.com/docs/truffle/quickstart.html
