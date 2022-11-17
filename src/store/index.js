import axios from 'axios';
import React, { useState, createContext } from 'react';

export const Context = createContext();

export default function Provider({children}) {
  // All data below is example
  const [user, setUser] = useState({
    id: '001'
  });

  /**
   * This isLogin is use for test
   * We will use token and store token to
   * storage instead of isLogin variable
   */
  const isLogin = user.id ? true : false;
  const store = {
    userState: {
      user,
      setUser,
    },
    isLogin,
  };
  return <Context.Provider value={store}>{children}</Context.Provider>
}
