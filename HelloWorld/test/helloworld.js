const HelloWorld = artifacts.require('HelloWorld')

contract("HelloWorld", (accounts) => {

  it("get hello world", async () => {
    const instance = await HelloWorld.deployed()
    const value = await instance.getHelloMessage.call()

    assert.equal(value, "Hello World!")
  })

})