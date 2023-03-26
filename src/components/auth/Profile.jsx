import React from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/profile.css';
import RewardSection from "../RewardSection";

const  Profile=()=>{
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
          await logout()
          navigate("/login")
      }

    return (
        <div>
        <div className='profilebox'>
            {/* <img src="" alt="" /> */}
            <h1>Profile</h1>
            <h4>{currentUser.email}</h4>
            <button onClick={handleLogout}>Logout</button>
        </div>
        {currentUser.email==="admin@admin.com"?<RewardSection/>:null}
        
        </div>
    )
}

export default Profile;