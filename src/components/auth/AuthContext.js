import React, { useContext, useState, useEffect } from "react"
import { auth, realtimeDb } from "../../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import {doc,collection,setDoc} from 'firebase/firestore';
import db from "../../firebase";
import {ref, child, get } from "firebase/database";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

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
async function login(email, password) {
  var verified=true;
    if(email==="admin@admin.com"){
      alert("Waiting For Verification.");
      const dbRef = ref(realtimeDb);
      await get(child(dbRef,'/AdminAuth/')).then((snapshot) => {
      if (snapshot.exists()) {
        if(snapshot.val()){
          alert("Admin Verified");
        }
        else{
          alert("Admin Not Verified");
          verified=false;
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
    }
    if(verified){
    return signInWithEmailAndPassword(auth,email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      return false;
    })
  }
  else{
    return false;
  }
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
