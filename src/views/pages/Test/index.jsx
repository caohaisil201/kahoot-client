import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { SocketContext } from 'store/socket';
import { SOCKET_ACTION } from 'utils';

const Test = () => {
  const socket = useContext(SocketContext);
  // const [slideNo, setSlideNo] = useState(0);
  const [result, setResult] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });
  const [ranking, setRanking] = useState({});
  // const [marks, setMarks] = useState([]);
  const onClickStart = (presentCode) => {
    socket.emit(SOCKET_ACTION.JOIN_GAME, {
      presentCode,
    })
    socket.emit(SOCKET_ACTION.START_GAME, {
      presentCode,
    });
  };
  const onClickNext = (presentCode) => {
    setResult({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    })
    socket.emit(SOCKET_ACTION.NEXT_SLIDE, {
      presentCode,
    });
  };

  const onClickResult = (presentCode) => {
    socket.emit(SOCKET_ACTION.SEND_RESULT, {
      presentCode,
      result,
    });
  }

  useEffect(() => {
    socket.on(SOCKET_ACTION.RECEIVE_ANSWER, (data) => {
      const tempRanking ={...ranking};
      if(!tempRanking[data.name]) {
        tempRanking[data.name] = 0;
      }
      if(data.isCorrectAnswer) {
        tempRanking[data.name] ++;
      }
      const tempResult = {...result};
      data.choices.forEach(choice => {
        tempResult[choice]++;
      })
      setResult({...tempResult});
    });
    return () => {
      socket.off(SOCKET_ACTION.RECEIVE_ANSWER);
    };
  }, [result]);

  return (
    <div className="container d-flex mt-10">
      <button onClick={() => onClickStart('PR220001')}>START</button>
      <button onClick={() => onClickNext('PR220001')}>NEXT</button>
      <button onClick={() => onClickResult('PR220001')}>SHOW RESULT</button>
      <div className="mx-12"></div>
      <button onClick={() => onClickStart('PR220002')}>START2</button>
      <button onClick={() => onClickNext('PR220002')}>NEXT2</button>
      <button onClick={() => onClickResult('PR220002')}>SHOW RESULT2</button>
    </div>
  );
};

export default Test;
