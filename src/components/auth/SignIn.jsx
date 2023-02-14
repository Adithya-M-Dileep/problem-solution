import React, { useState} from "react";
import { useNavigate } from "react-router-dom"
import {useAuth} from "./AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 async function signIn(e){
  e.preventDefault()
    await login(email,password);
    navigate("/");

  // setLoading(false)
}

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
      <label>Don't have an account?</label>
      <a href="/signup">Sign Up</a>
    </div>
  );
};

export default SignIn;
