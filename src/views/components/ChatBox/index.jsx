import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './style.scss';
import { SOCKET_ACTION } from 'utils';

const ChatBox = React.memo(({ socket, code, accessToken, messageList }) => {
  const [value, setValue] = useState('');
  const messageEndRef = useRef(null);
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onSendMessage = () => {
    if (!value) {
      return;
    }
    socket.emit(SOCKET_ACTION.SEND_MESSAGE, {
      presentCode: code,
      token: accessToken,
      message: value,
      // name
    });
    setValue('');
  };

  useEffect(scrollToBottom, [messageList.length]);

  // useEffect(() => {
  //   socket.on(SOCKET_ACTION.RECEIVE_MESSAGE, (data) => {
  //     const { token, message } = data;
  //     const item = {
  //       message,
  //     }
  //     accessToken === token ? item.isMe = true : item.isMe=false;
  //     setMessageList([...messageList, item]);
  //   });

  //   return () => {
  //     socket.off(SOCKET_ACTION.RECEIVE_ANSWER);
  //   };
  // }, [messageList.length]);

  return (
    <div className="chat-box pa-4">
      <div className="messages">
        {messageList.map((item, index) => {
          return <div className={`item d-flex pr-2 ${item.isMe ? 'justify-end' : 'justify-start'}`} key={index}>{item.message}</div>;
        })}
        <div ref={messageEndRef}></div>
      </div>
      <div className="d-flex">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="icon ml-2" onClick={onSendMessage}>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
});

export default ChatBox;
