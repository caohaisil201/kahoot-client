import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from 'store';

const PrivateRoute = ({ children }) => {
  const loginState = useContext(Context).loginState;
  if(!loginState) {
    return null; // or loading spinner
  }
  return loginState.isLogin ? children : <Navigate to='/sign-in' />
};

export default PrivateRoute;
