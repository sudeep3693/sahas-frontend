// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // initially null
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedEmail = localStorage.getItem('adminEmail') || '';
    setIsAuthenticated(loggedIn);
    setAdminEmail(savedEmail);
    setLoading(false); // done loading
  }, []);

  const login = (email) => {
    localStorage.setItem('isLoggedIn', 'true');
    if (email) {
      localStorage.setItem('adminEmail', email);
      setAdminEmail(email);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminEmail');
    setAdminEmail('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
