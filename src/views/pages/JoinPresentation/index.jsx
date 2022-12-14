import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { findGameByCodeAPI } from 'api/GameAPI';
import Loading from 'views/components/Loading';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const JoinPresentation = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);
  const [gameCode, setGameCode] = useState('');
  const [gameName, setGameName] = useState('');

  const handleChangeGameCode = (e) => {
    setGameCode(e.target.value);
  };

  const onSubmit = async () => {
    if (gameCode === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Bạn chưa nhập code!',
      });
      return;
    }
    const instanceGame = await findGameByCodeAPI(accessToken, gameCode);
    if (!instanceGame[0]) {
      Swal.fire({
        title: 'Error!',
        text: 'Game không tồn tại!',
      });
    } else {
      setGameName(instanceGame[0].name);
      setIsWaiting(true);
    }
  };
  
  // socket to change to game page
  
  useEffect(() => {
    if(gameName!=='') {
      navigate(`/game/${gameCode}`, { state: {  gameName } });
    }

  }, [gameName])
  

  if (!isWaiting)
    return (
      <div className="container mt-16">
        <div className="join-presentation flex-column d-flex">
          <h1>Edubox!</h1>
          <input
            placeholder="GAME CODE"
            value={gameCode}
            onChange={handleChangeGameCode}
          />
          <button className="primary mt-8" onClick={onSubmit}>
            START
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mt-16">
      <div className="join-presentation waiting flex-column d-flex">
        <h1>Quiz title</h1>
        <Loading />
        <h2>Vui lòng chờ host bắt đầu game</h2>
      </div>
    </div>
  );
};

export default JoinPresentation;
