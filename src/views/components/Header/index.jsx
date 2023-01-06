import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Context } from 'store';
import {
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Logo from '../Logo';
import './style.scss';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('access_token');
  const { accessTokenState } = useContext(Context);

  const handleLogout = () => {
    accessTokenState.setAccessToken('');
    sessionStorage.clear();
    navigate('/sign-in');
  };
  const navLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link-active' : '';
  };

  return (
    <div id="app-header" className="d-flex align-center py-2">
      <div className="container d-flex align-center">
        <Logo />
        <nav className="header-nav d-flex">
          <div className="normal-nav">
            <NavLink className={navLinkClass} to="/" end>
              Trang chủ
            </NavLink>
            <NavLink className={navLinkClass} to="/groups">
              Danh sách nhóm
            </NavLink>
            <NavLink className={navLinkClass} to="/presentations">
              Danh sách presentation
            </NavLink>
          </div>
          {accessToken ? (
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
              <button className="icon" onClick={handleLogout}>
                <LogoutOutlined />
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
