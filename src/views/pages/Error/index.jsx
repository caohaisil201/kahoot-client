import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Error = () => {
  return <div id="error-page">
    <h2>Something went wrong</h2>
    <Link to="/" >
      Back to home
    </Link>
  </div>;
};

export default Error;
