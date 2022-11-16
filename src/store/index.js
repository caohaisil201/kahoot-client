import axios from 'axios';
import React, { useState, createContext } from 'react';

export const Context = createContext();

export default function Provider({children}) {
  // All data below is example
  const [user, setUser] = useState({
    id: '001'
  });
  const store = {
    userState: {
      user,
      setUser,
    }
  };
  return <Context.Provider value={store}>{children}</Context.Provider>
}
