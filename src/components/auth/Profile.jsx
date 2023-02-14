import React from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const  Profile=()=>{
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
          await logout()
          navigate("/login")
      }

    return (
        <div className='profile'>
            <h1>Profile</h1>
            <h4>{currentUser.email}</h4>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile;