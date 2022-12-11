import React from 'react';
import Loading from 'views/components/Loading';
import './style.scss';

const JoinPresentation = () => {
  const bool = false;

  if (bool)
    return (
      <div className="container mt-16">
        <div className="join-presentation flex-column d-flex">
          <h1>Edubox!</h1>
          <input placeholder="GAME ID" />
          <button className="primary mt-8">START</button>
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
