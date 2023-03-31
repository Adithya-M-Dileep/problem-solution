import React from 'react';
import {ethers} from 'ethers';
import {collection, onSnapshot ,doc,getDoc,deleteDoc} from 'firebase/firestore';
import db from "../firebase";
import { useState,useEffect } from "react";

const TOKEN_ADDRESS = '0x0cc1E618D345bB123d6159363A206149f993c2BA';
const TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount)',
];
const amount =10;


function RewardSection(){
    const collectionInfo=collection(db,'rewards');
    const [rewards,setRewards]=useState([]);   

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
                alert(err);
            }
        } else {
            console.log("No such document!");
        }
    }
    async function sendTransaction(toAddress) {
        // Connect to the user's MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Instantiate the token contract
        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

        // Transfer tokens to the specified address
        const tx = await tokenContract.transfer(toAddress, ethers.utils.parseUnits(amount.toString(), 18));
        console.log(`Transaction hash: ${tx.hash}`);
    }      

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
        {rewards}
        </div>
    )
}

export default RewardSection;