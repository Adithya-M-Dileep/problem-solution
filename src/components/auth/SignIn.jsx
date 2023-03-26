import React, { useState} from "react";
import { useNavigate } from "react-router-dom"
import {useAuth} from "./AuthContext";
import '../styles/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 async function signIn(e){
  e.preventDefault()
    var status = await login(email,password);
    console.log(status);
    if(status){
    navigate("/");
    }

  // setLoading(false)
}

  return (
    <div className="flex">
    <div className="welcome">
      {/* <h4>COMPANY NAME</h4> add the name of website here*/}
      <h1>WELCOME BACK</h1>
      <hr className="line"/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Login Account</h1><br /><br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input><br /><br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input><br /><br /><br />
        <div className="btn">
        <button type="submit">
          Log In
        </button>
        </div>
      </form>
      <br />
      <label>Don't have an account?</label>&nbsp;&nbsp;
      <a href="/signup">Sign Up</a>
    </div>
    </div>
  );
};

export default SignIn;
