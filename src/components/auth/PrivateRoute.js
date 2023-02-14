import React from "react";
import { useNavigate, Outlet } from 'react-router-dom';
// import { Route} from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return currentUser ? <Outlet/> : navigate("/login");
}
