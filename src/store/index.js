import React, { useState, useEffect, createContext } from 'react';

export const Context = createContext();

export default function Provider({ children }) {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!!access_token) {
      setAccessToken(access_token);
      setIsLogin(true);
    }
  }, []);

  const store = {
    userState: {
      user,
      setUser,
    },
    loginState: {
      isLogin,
      setIsLogin,
    },
    accessTokenState: {
      accessToken,
      setAccessToken,
    },
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
