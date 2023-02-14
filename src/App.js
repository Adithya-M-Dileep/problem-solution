import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import NewQuestion from "./components/NewQuestion.jsx";
import QuestionPage from "./components/QuestionPage.jsx";
import Profile from "./components/auth/Profile.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute/>}>
            <Route  path='/' element={ <div><Navbar /><HomePage/></div>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/profile" element={<div><Navbar /><Profile/></div>}/>
          <Route path="/new-question" element={<div><Navbar /><NewQuestion /></div>} />
          <Route path="/question/:id" element={<div><Navbar /><QuestionPage /></div>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
