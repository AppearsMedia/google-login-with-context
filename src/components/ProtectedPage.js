import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedPage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user?.name}</p>
      <p>Username: {user?.given_name}</p>
      <p>Last Name: {user?.family_name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
