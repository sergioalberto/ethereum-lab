import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/supplyChain.json';
import { ethers } from 'ethers';
import {Main} from "./components/Main";
import { message } from 'antd';

const abi = contract.abi;

function App() {

    const [currentAccount, setCurrentAccount] = useState(null);

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found");
        }
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            message.info("Please, install Metamask!");
            return;
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err)
        }
    }

    // eslint-disable-next-line no-unused-vars
    const getBalanceHandler = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const balance = await provider.getBalance(currentAccount);
                // convert a currency unit from wei to ether
                const balanceInEth = ethers.utils.formatEther(balance);
                console.log(`Balance: ${balanceInEth} ETH`);
                alert(`Balance: ${balanceInEth} ETH.`);

                const chainId = (await provider.getNetwork()).chainId;
                const contractAddress = contract.networks[chainId].address;

                const signer = provider.getSigner();
                const supplyChain = new ethers.Contract(contractAddress, abi, signer);

                // Create new Participant
                /* const participantTxn = await supplyChain.functions.addParticipant("Alberto", "5678", currentAccount, "Supplier");

                console.log("Mining... please wait");
                await participantTxn.wait();

                console.log(`Mined, see transaction hash: ${participantTxn.hash}`); */

                const gas = await supplyChain.estimateGas.getParticipant(0);
                console.log(gas.toNumber());

                const participant = await supplyChain.functions.getParticipant(1);
                console.log(participant);
            } else {
                console.log("Ethereum object does not exist.");
            }

        } catch (err) {
            console.log(err);
        }
    }

    const connectWalletButton = () => {
        return (
            <>
                <div className='main-app'>
                    <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
                        Connect Wallet
                    </button>
                </div>
            </>
        )
    }

    const getParticipants = () => {
        return (
            <Main />
        )
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    return (
        <div>
            <h1 className='main-app'>Supply Chain App</h1>
            <div>
                {currentAccount ? getParticipants() : connectWalletButton()}
            </div>
        </div>
    )
}

export default App;
