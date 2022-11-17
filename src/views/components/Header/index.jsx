import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Context } from 'store';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../Logo';
import './style.scss';

const Header = () => {
  const context = useContext(Context);
  const isLogin = context.isLogin;

  const navLinkClass = ({isActive}) => {
    return isActive ? 'nav-link-active' : '';
  }

  return (
    <div id="app-header" className="d-flex align-center">
      <div className="container d-flex align-center">
        <Logo />
        <nav className="header-nav d-flex">
          <div className="normal-nav">
            <NavLink className={navLinkClass} to="/" end>Trang chủ</NavLink>
            <NavLink className={navLinkClass} to="/courses">Danh sách course</NavLink>
            <NavLink className={navLinkClass} to="/tutorial">Hướng dẫn sử dụng</NavLink>
          </div>
          {isLogin ? (
            <div className="features d-flex ml-8">
              <button className="icon">
                <BellOutlined />
              </button>
              <button className="icon">
                <SettingOutlined />
              </button>
              <button className="icon">
                <UserOutlined />
              </button>
            </div>
          ) : (
            <div className="authen-nav">
              <Link to="/sign-in">Đăng nhập</Link>
              <Link to="/sign-up">Đăng ký</Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
