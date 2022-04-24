const Web3 = require("web3");
const SupplyChain = require("../SupplyChainApp/build/contracts/supplyChain.json");
const HDWalletProvider = require("@truffle/hdwallet-provider"); // https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider
const fs = require('fs');

// YOUR MNEMONIC FROM YOUR WALLET (MetaMask), when we set up MetaMask, it's a bunch of words
const mnemonicPhrase = fs.readFileSync(".secret").toString().trim();
const infuraProjectID = fs.readFileSync("infuraConfig").toString().trim();

const URL = `https://ropsten.infura.io/v3/${infuraProjectID}`;

const init = async () => {
    const web3 = new Web3 (new Web3.providers.HttpProvider(URL))

    const provider = new HDWalletProvider({
        mnemonic: {
            phrase: mnemonicPhrase
        },
        providerOrUrl: URL
    });

    web3.setProvider(provider);

    const id = await web3.eth.net.getId();
    const deployedNetwork = SupplyChain.networks[id];
    const supplyChain = new web3.eth.Contract(
        SupplyChain.abi,
        deployedNetwork.address
    );

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(web3.utils.fromWei(balance, "ether") + " ETH");

    const gas = await supplyChain.methods.getParticipant(0).estimateGas();
    console.log(gas);

    // set the default account
    web3.eth.defaultAccount = accounts[0];

    // Create new Participant
    /* const newParticipant = await supplyChain.methods
        .addParticipant("Sergio", "1234", accounts[0], "Manufacturer")
        .send({ from: accounts[0] });
    console.log(newParticipant); */

    const participant = await supplyChain.methods
        .getParticipant(0)
        .call();
    console.log(participant);

    // console.log(receipt.events.TransferOwnership.raw);

    // At termination, `provider.engine.stop()' should be called to finish the process elegantly.
    provider.engine.stop();
};

init();
