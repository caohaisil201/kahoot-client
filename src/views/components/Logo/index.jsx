import React from 'react';
import './style.scss';
import LogoIcon from 'assets/images/Logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <div className="image" alt="logo">
        <img alt="Logo" src={LogoIcon} />
      </div>
      <h3> EduBox</h3>
    </div>
  );
};

export default Logo;
