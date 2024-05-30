import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedRoute = ({ children }) => {


  // Här använder man context för att se om user finns eller inte. Om user existerar då visar man sidan annars så blir användaren skickat till /login
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
