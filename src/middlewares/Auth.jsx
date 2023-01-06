import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const access_token = sessionStorage.getItem('access_token');
  return access_token ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
