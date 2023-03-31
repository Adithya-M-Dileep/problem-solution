import React, {useState} from 'react';
import {ethers} from 'ethers';

const Transact = () => {
const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [userBalance, setUserBalance] = useState(null);
const connectWallet = () => {
if (window.ethereum) { window.ethereum.request({method: 'eth_requestAccounts'}).then(result => { accountChanged ( [result[0]]) })
} else {
setErrorMessage('Install MetaMask please!!')
}
};
const accountChanged = (accountName) => {
setDefaultAccount (accountName)
getUserBalance (accountName)
};
const getUserBalance = (accountAddress) => {
    window.ethereum.request ({method: 'eth_getBalance', params: [String (accountAddress), "latest"]})
    .then (balance => {
    setUserBalance (ethers.utils.formatEther (balance));
    })
    };
    return (
        <div>
        <center>
        <h1>MetaMask Wallet Connection</h1>
        <button onClick={connectWallet}>Connect Wallet Button </button>
        <h3>Address: {defaultAccount}</h3>
        <h3>Balance: {userBalance}</h3>
        {errorMessage}
        </center>
        </div>
    )
        };