import React, { useState, useEffect, createContext } from 'react';

export const Context = createContext();

export default function Provider({ children }) {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const access_token = sessionStorage.getItem('access_token');
    if (!!access_token) {
      setAccessToken(access_token);
    }
  }, []);

  const store = {
    userState: {
      user,
      setUser,
    },
    accessTokenState: {
      accessToken,
      setAccessToken,
    },
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
