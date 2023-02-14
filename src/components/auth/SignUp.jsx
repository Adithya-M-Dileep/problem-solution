import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth()
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault()
      await signup(email, password)
      navigate("/");
  }

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
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
        <button type="submit">Sign Up</button>
      </form>
      <label>Already have an account?</label>
      <a href="/login">Log in</a>
    </div>
  );
};

export default SignUp;
