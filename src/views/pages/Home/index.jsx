import React from 'react';
import Banner from 'assets/images/banner_image.png';
import './style.scss';

const HomePage = () => {
  return <div className="home-page">
    <div className="container">
      <div className="banner">
        <img src={Banner} alt="Banner" />
      </div>
      <div className="content">
        <h1>Giúp lớp học vui nhộn hơn</h1>
        <button className="primary large">
          Bắt đầu
        </button>
      </div>
    </div>
  </div>;
};

export default HomePage;
