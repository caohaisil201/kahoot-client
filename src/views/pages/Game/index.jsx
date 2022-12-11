import React, { useState } from 'react';
import './style.scss';
import Answer from './Answer';
import Waiting from './Waiting';
import Result from './Result';

const Game = () => {
  const userProfile = {
    role: 'OWNER',
  };

  const [slideState, setSlideState] = useState(3);

  switch (slideState) {
    case 1:
      return (
        <div className="container">
          <Answer userProfile={userProfile}/>
        </div>
      );
    case 2:
      return (
        <div className="container">
          <Waiting userProfile={userProfile}/>
        </div>
      );
    case 3:
      return (
        <div className="container">
          <Result userProfile={userProfile}/>
        </div>
      );
    default:
      return <></>;
  }
};

export default Game;
