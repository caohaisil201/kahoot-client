import React, { useState, createContext } from 'react';

export const Context = createContext();

export default function Provider({ children }) {
  // All data below is example
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const access_token = localStorage.getItem('access_token');
  if (!!access_token && accessToken !== access_token) {
    setAccessToken(access_token);
	}

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
