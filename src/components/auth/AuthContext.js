import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import {doc,collection,setDoc} from 'firebase/firestore';
import db from "../../firebase";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  function signup(email, password ,walletAddress) {
    const userRef = doc(collection(db, "users"), email);
    try{
        setDoc(userRef,{walletAddress:walletAddress});
    }
    catch(error){
        console.log(error);
    }
    return createUserWithEmailAndPassword(auth,email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
