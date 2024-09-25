
import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser)

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = localStorage.getItem('userId')
    console.log("storedUser", storedUser)
    if (storedUser) {
      setCurrentUser(storedUser);
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
