import React, { useState } from 'react';
import './style.scss';
import Answer from './Answer';
import Waiting from './Waiting';
import Result from './Result';

const Game = () => {
  const userProfile = {
    role: 'OWNsER',
  };

  const [slideState, setSlideState] = useState(1);

  switch (slideState) {
    case 1:
      return (
        <div className="container">
          <Answer
            setSlideState={setSlideState}
            userProfile={userProfile}
          />
        </div>
      );
    case 2:
      return (
        <div className="container">
          <Waiting
            setSlideState={setSlideState}
            userProfile={userProfile}
          />
        </div>
      );
    case 3:
      return (
        <div className="container">
          <Result
            setSlideState={setSlideState}
            userProfile={userProfile}
          />
        </div>
      );
    default:
      return <></>;
  }
};

export default Game;
