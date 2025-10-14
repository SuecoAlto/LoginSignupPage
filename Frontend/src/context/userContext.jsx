// Frontend/src/context/userContext.jsx

import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // This effect runs once when the app loads
  useEffect(() => {
    // If we don't already have a user, check if there's a session on the server
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          // If the call succeeds, set the user data in our state
          setUser(data.data);
        })
        .catch((error) => {
          // If it fails (no valid cookie), nothing happens, user remains null
          console.log("No user session found.");
        });
    }
  }, []); // The empty array [] ensures the effect only runs once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
