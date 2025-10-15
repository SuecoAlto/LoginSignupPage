// Frontend/src/pages/Home.jsx

import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router";

export default function Home() {
  const { user } = useContext(UserContext);

  // If user is logged in, navigate to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // If user is NOT logged in, navigate to login
  return <Navigate to="/login" />;
}
