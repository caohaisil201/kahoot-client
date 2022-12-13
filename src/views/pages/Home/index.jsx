import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from 'hooks';
import Banner from 'assets/images/banner_image.png';
import './style.scss';

const HomePage = () => {
  useDocumentTitle('EduBox');

  return (
    <div className="home-page">
      <div className="container d-flex justify-space-between align-center">
        <div className="banner">
          <img src={Banner} alt="Banner" />
        </div>
        <div className="content d-flex flex-column align-center">
          <h1>Giúp lớp học vui nhộn hơn</h1>
          <Link to="/join-presentation" className="button primary large">
            Tham gia
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
