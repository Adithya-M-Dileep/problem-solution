import React from 'react';
import { useState } from "react";
import {ethers} from 'ethers';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/profile.css';
import RewardSection from "../RewardSection";

const TOKEN_ADDRESS = '0x0cc1E618D345bB123d6159363A206149f993c2BA';
const TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount)',
];

const  Profile=()=>{
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [userBalance, setBalance] = useState(0);

    async function handleLogout() {
          await logout()
          navigate("/login")
      }

      
    const viewBalance = async() => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
  
        // Get the balance of the token for the current user
        const userAddress = await signer.getAddress();
        const balance = await tokenContract.balanceOf(userAddress);
        const balanceInWei = balance.toString();
        setBalance(Number(balanceInWei.substr(0,balanceInWei.length-18))) ;
    };

    return (
        <div>
        <div className='profilebox'>
            {/* <img src="" alt="" /> */}
            <h1>Profile</h1>
            <h4>{currentUser.email}</h4>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div class="rewardSection">
        <button onClick={viewBalance}>View Balance:</button>
        <p>Balance: {userBalance}</p>
        </div>
        {currentUser.email==="admin@admin.com"?<RewardSection/>:null}
        
        </div>
    )
}

export default Profile;