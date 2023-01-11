import React from 'react';
import Loading from 'views/components/Loading';

const Waiting = ({ gameName, socket, setSlideState }) => {
  return (
    <div className="waiting mt-6 d-flex flex-column justify-space-between">
      <div className="header">
        <h1>{gameName}</h1>
      </div>
      <Loading />
      <h2>
        Bạn vừa trả lời xong <br /> Vui lòng đợi một xíu nhé!
      </h2>
    </div>
  );
};

export default Waiting;
