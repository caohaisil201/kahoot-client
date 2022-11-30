import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import Logo from '../Logo';
import './style.scss';

const Footer = () => {
  return (
    <div id="app-footer">
      <div className="container">
        <Logo />
        <div className="reference">
          <Link to="/about-us">Về chúng tôi</Link>
          <Link to="/rules">Điều khoản sử dụng</Link>
        </div>
        <div className="social">
          <a
            href="https://facebook.com"
            target="_blank"
            alt="Facebook"
            rel="noreferrer"
          >
            <FacebookOutlined />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <InstagramOutlined />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <YoutubeOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
