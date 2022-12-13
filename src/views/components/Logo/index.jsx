import React from 'react';
import './style.scss';
import LogoIcon from 'assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="logo" onClick={handleClick}>
      <div className="image" alt="logo">
        <img alt="Logo" src={LogoIcon} />
      </div>
      <h3 className="mb-0"> EduBox</h3>
    </div>
  );
};

export default Logo;
