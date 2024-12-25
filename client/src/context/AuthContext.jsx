// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import authService from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setUser (response);
    localStorage.setItem('token', response.token);
  };

  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password);
    setUser (response);
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    setUser (null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getProfile(token)
        .then(response => setUser (response))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};