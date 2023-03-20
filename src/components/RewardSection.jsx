import React from "react";
import {collection, onSnapshot ,doc,getDoc} from 'firebase/firestore';
import db from "../firebase";
import { useState,useEffect } from "react";

async function TransferCoin(user){
    
    const userRef = doc(collection(db, "users"), user);
    const addressDoc = await getDoc(userRef);
    var address;
    if (addressDoc.exists()) {
        address =addressDoc.data().walletAddress;
        console.log(user+":"+address);
    } else {
        console.log("No such document!");
    }
}
function RewardSection(){
    const collectionInfo=collection(db,'rewards');
    const [rewards,setRewards]=useState([]);
    useEffect(() => {
        const unsub=onSnapshot(collectionInfo,(querySnapshot)=>{
            var q=[];
            querySnapshot.forEach((doc)=>{
                const reward=doc.data();
                q.push(<div className="tokenTransferSection">
                    <p>{reward.author}</p>
                    <a href={"/question/"+reward.questionID}>Question Details</a><br/>
                    <button onClick={()=>{TransferCoin(reward.author)}}>Transfer</button>
                </div>);
            });
            
            setRewards(q);
        });
        return () =>{
            unsub();
        };

    },[]);
    return (
        <div>
        <button>Connect TO Wallet</button>
        <p>Account balance:</p>
        {rewards}
        </div>
    )
}

export default RewardSection;