import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    try {
      await register(name, email, password);
      navigate('/profile'); 
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Register</h1>
      <AuthForm onSubmit={handleRegister} isLogin={false} />
    </div>
  );
};

export default RegisterPage;