import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      try {
        const userObject = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (userObject.exp > currentTime) {
          setUser(userObject);
        } else {
          Cookies.remove('jwtToken');
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const login = (token) => {
    try {
      const userObject = jwtDecode(token);
      setUser(userObject);
      Cookies.set('jwtToken', token, { expires: 1 / 24 });
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    Cookies.remove('jwtToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
