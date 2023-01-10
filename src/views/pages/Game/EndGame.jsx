import { endPresentation } from 'api/PresentationAPI';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EndGame = ({ accessToken, isHost }) => {
  const endGame = async () => {
    await endPresentation(accessToken, isHost);
  };

  useEffect(() => {
    if (isHost) {
      endGame();
    }
  }, []);

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
