import React from 'react';
import {ethers} from 'ethers';
import {collection, onSnapshot ,doc,getDoc,deleteDoc} from 'firebase/firestore';
import db from "../firebase";
import { useState,useEffect } from "react";


function RewardSection(){   
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    let provider;
    let signer;
    let signerAddress;

    const tokenContractAddress = "0x0cc1E618D345bB123d6159363A206149f993c2BA";
    const tokenABI = [
        "function balanceOf(address account) view returns (uint256)",
        "function transfer(address recipient, uint256 amount) returns (bool)",
        "function approve(address spender, uint256 amount) returns (bool)",
        "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
        "function allowance(address owner, address spender) view returns (uint256)",
        "event Transfer(address indexed from, address indexed to, uint256 value)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)"

    ];
    let tokenContract;
    let userTokenBalance;
    const connectWallet = async() => {
        if (window.ethereum) { 
            window.ethereum.request({method: 'eth_requestAccounts'}).then(async result => { 
                await accountChanged ( [result[0]]) 
                provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log(provider);
                signer = provider.getSigner();
                console.log(signer);
                signerAddress = signer.getAddress();
                console.log(signerAddress);
                tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
                console.log(tokenContract);
            })
        } else {
            setErrorMessage('Install MetaMask please!!')
        }
    };
    const accountChanged =(accountName) => {
        setDefaultAccount (accountName)
        getUserBalance (accountName)
    };
    const getUserBalance = (accountAddress) => {
        window.ethereum.request ({method: 'eth_getBalance', params: [String (accountAddress), "latest"]}).then (balance => {
            setUserBalance (ethers.utils.formatEther (balance));
        })
    };
    async function deleteReward(id){
        const rewardRef = doc(db, "rewards", id);
        await deleteDoc(rewardRef);
    }
    async function TransferCoin(user,id){
    
        const userRef = doc(collection(db, "users"), user);
        const addressDoc = await getDoc(userRef);
        var address;
        if (addressDoc.exists()) {
            address =addressDoc.data().walletAddress;
            console.log(user+":"+address);
            try{
            await sendTransaction(address);
            deleteReward(id);}
            catch(err){
                alert("Something went wrong!");
            }
        } else {
            console.log("No such document!");
        }
    }
    async function sendTransaction(address) {
        let params = [{
        from: "0x2bc3085ed905ae71c5edd6c69320df3fd0540441",
        to: address,
        gas: Number (21000).toString(16),
        gasPrice: Number (2500000).toString(16),
        value: Number (10000000000000).toString(16),
        }]
        let result = await window.ethereum. request({method: "eth_sendTransaction", params}).catch((err) => {
            throw err;
        console.log(err)
        })
        }
    async function TokenBalance(){
        userTokenBalance = await tokenContract.balanceOf(signerAddress);
        console.log(userTokenBalance);
    }
    const collectionInfo=collection(db,'rewards');
    const [rewards,setRewards]=useState([]);         
    useEffect(() => {
        const unsub=onSnapshot(collectionInfo,(querySnapshot)=>{
            var q=[];
            querySnapshot.forEach((doc)=>{
                const reward=doc.data();
                q.push(<div className="tokenTransferSection">
                <div className="rewardDetaild">
                    <p>{reward.author}</p>
                    <a href={"/question/"+reward.questionID}>Question Details</a><br/>
                </div>
                <div className="rewardButton">
                    <button onClick={()=>{TransferCoin(reward.author,doc.id)}}>Transfer</button>
                    <button onClick={()=>{deleteReward(doc.id)}}>Delete</button>
                </div>
                </div>);
            });
            
            setRewards(q);
        });
        return () =>{
            unsub();
        };

    },[]);
    return (
        <div class="rewardSection">
        <button onClick={connectWallet}>Connect TO Wallet</button>
        <p>Account balance: {defaultAccount}</p>
        <p>Balance: {userBalance}</p>
        <button onClick={TokenBalance}>trial</button>
        {rewards}
        </div>
    )
}

export default RewardSection;