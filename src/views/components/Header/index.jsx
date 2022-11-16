import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './style.scss';

const Header = () => {
  return <div id="app-header">
    <div className="container">
      <Logo />
      <nav className="header-nav">
        <div className="normal-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/news-feed">News feed</Link>
          <Link to="/tutorial">Hướng dẫn sử dụng</Link>
        </div>
        <div className="authen-nav">
          <Link to="/sign-in">Đăng nhập</Link>
          <Link to="/sign-up">Đăng ký</Link>
        </div>
      </nav>
    </div>
  </div>;
};

export default Header;
