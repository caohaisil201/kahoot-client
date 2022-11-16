import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from 'store';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../Logo';
import './style.scss';

const Header = () => {
  const context = useContext(Context);
  const { user } = context.userState;
  const isLogin = user.id ? true : false;
  return <div id="app-header" className="d-flex align-center">
    <div className="container d-flex align-center">
      <Logo />
      <nav className="header-nav d-flex">
        <div className="normal-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/course-list">Danh sách course</Link>
          <Link to="/tutorial">Hướng dẫn sử dụng</Link>
        </div>
        {isLogin ? 
        <div className="features d-flex ml-8">
          <button className="icon">
            <BellOutlined/>
          </button>
          <button className="icon">
            <SettingOutlined />
          </button>
          <button className="icon">
            <UserOutlined />
          </button>
        </div> :
        <div className="authen-nav">
          <Link to="/sign-in">Đăng nhập</Link>
          <Link to="/sign-up">Đăng ký</Link>
        </div>}
        
      </nav>
    </div>
  </div>;
};

export default Header;
