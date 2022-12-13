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
  // const [marks, setMarks] = useState([]);
  const onClickStart = () => {
    socket.emit(SOCKET_ACTION.START_GAME, {
      presentCode: 'PR220001',
    });
  };
  const onClickNext = () => {
    setResult({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    })
    socket.emit(SOCKET_ACTION.NEXT_SLIDE, {
      presentCode: 'PR220001',
    });
  };

  const onClickResult = () => {
    socket.emit(SOCKET_ACTION.SEND_RESULT, {
      presentCode: 'PR220001',
      result,
    });
  }

  useEffect(() => {
    socket.on(SOCKET_ACTION.RECEIVE_ANSWER, (data) => {
      let tempResult = {...result};
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
      <button onClick={onClickStart}>START</button>
      <button onClick={onClickNext}>NEXT</button>
      <button onClick={onClickResult}>SHOW RESULT</button>
    </div>
  );
};

export default Test;
