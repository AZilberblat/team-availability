import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/AuthService';
import { saveAuthToLocalStorage } from '../utils/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      saveAuthToLocalStorage(data.access_token, username);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return <AuthForm onSubmit={handleLogin} error={error} />;
}

export default LoginPage;
