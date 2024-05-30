import React, { useEffect, useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const LoginPage = () => {
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/protected');
    }
  }, [user, navigate]);

  const handleCallbackResponse = (token) => {
    login(token);
  };

  return (
    <>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={credentialResponse => handleCallbackResponse(credentialResponse.credential)}
        onError={() => console.log('Login Failed')}
      />
    </>
  );
};

export default LoginPage;
