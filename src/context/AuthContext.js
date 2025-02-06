// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const guestLogin = () => {
    setIsAuthenticated(true);
    setUser({ name: "Guest" }); // A placeholder for guest user
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
