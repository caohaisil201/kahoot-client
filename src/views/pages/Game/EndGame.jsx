import React from 'react';
import { Link } from 'react-router-dom';

const EndGame = () => {
  return (
    <div className="end-game mt-6 d-flex flex-column justify-space-between">
      <div className="header">
        <h1>Quiz</h1>
      </div>
      <h2>
        Game đã kết thúc! <br /> Cảm ơn bạn đã tham gia
      </h2>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
};

export default EndGame;
