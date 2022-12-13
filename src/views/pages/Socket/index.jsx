import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from 'store/socket';

const Socket = () => {
  const socket = useContext(SocketContext);
  const [text, setText] = useState('');

  const handleClick = () => {
    if (text === '') {
      return;
    }
    socket.emit('message', {
      text,
    })
  };
  useEffect(() => {
    socket.on('messageResponse', (data) => console.log(data));
  }, []);
  return (
    <div className="container mt-8 d-flex">
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className="ml-4 primary small" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default Socket;
