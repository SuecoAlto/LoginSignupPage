import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import axios from "axios";
import { Toaster } from "react-hot-toast"; // Import Toaster

// Set a base URL for all Axios requests
axios.defaults.baseURL = "http://localhost:5001/api/auth";
// Allow Axios to send cookies with requests
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />{" "} {/* Add Toaster */}
    </BrowserRouter>
  </StrictMode>
);
