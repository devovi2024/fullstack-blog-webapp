// src/pages/LoginPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (name, email, password) => {
    try {
      await login(email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Login</h1>
      <AuthForm onSubmit={handleLogin} isLogin={true} />
    </div>
  );
};

export default LoginPage;