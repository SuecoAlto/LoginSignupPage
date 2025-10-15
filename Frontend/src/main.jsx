import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import axios from "axios";
import { Toaster } from "react-hot-toast"; // Import Toaster
import { UserContextProvider } from "./context/userContext.jsx";

// Set a base URL for all Axios requests
axios.defaults.baseURL = import.meta.env.DEV 
  ? 'http://localhost:5000/api/auth' 
  : '/api/auth';
// Allow Axios to send cookies with requests
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
        <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />{" "} {/* Add Toaster */}
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
