import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SocketContext } from 'store/socket';
import { getSlideNoByGameCodeAPI, isHostAPI } from 'api/GameAPI';
import Loading from 'views/components/Loading';
import Answer from './Answer';
import Waiting from './Waiting';
import Result from './Result';
import EndGame from './EndGame';
import { MessageOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { SOCKET_ACTION } from 'utils';
import { usePrevious } from 'hooks';
import './style.scss';
import ChatBox from 'views/components/ChatBox';

const Children = ({
  slideState,
  gameName,
  slide,
  isHost,
  setSlideState,
  accessToken,
  code,
  socket,
  result,
}) => {
  switch (slideState) {
    case 1:
      return (
        <Answer
          gameName={gameName}
          slide={slide}
          isHost={isHost}
          setSlideState={setSlideState}
          accessToken={accessToken}
          code={code}
          socket={socket}
        />
      );
    case 2:
      return <Waiting gameName={gameName} setSlideState={setSlideState} />;
    case 3:
      return (
        <Result
          presentCode={code}
          gameName={gameName}
          slide={slide}
          isHost={isHost}
          setSlideState={setSlideState}
          result={result}
          socket={socket}
        />
      );
    default:
      return <></>;
  }
};

const Game = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const socket = useContext(SocketContext);
  const { code } = useParams();
  const { state } = useLocation();
  const { gameName } = state;

  const [slideState, setSlideState] = useState(1);
  const [slideNo, setSlideNo] = useState(1);
  const [result, setResult] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const prevSlideNo = usePrevious(slideNo);

  const slidesQuery = useQuery({
    queryKey: ['getSlides'],
    queryFn: async () =>
      await getSlideNoByGameCodeAPI(accessToken, code, slideNo),
  });

  const isHostQuery = useQuery({
    queryKey: ['getIsHost'],
    queryFn: async () => await isHostAPI(accessToken, code),
  });

  useEffect(() => {
    if (prevSlideNo !== slideNo) {
      slidesQuery.refetch();
    }

    socket.on(SOCKET_ACTION.NEXT_SLIDE, (data) => {
      if (data.presentCode === code) {
        setSlideNo(slideNo + 1);
        setSlideState(1);
      }
    });

    socket.on(SOCKET_ACTION.RECEIVE_RESULT, (data) => {
      const tempResult = [];
      Object.keys(data.result).forEach((item) => {
        tempResult.push({
          name: item,
          key: item,
          value: data.result[item],
        });
      });
      setResult([...tempResult]);
      setSlideState(3);
    });

    return () => {
      socket.off(SOCKET_ACTION.NEXT_SLIDE);
      socket.off(SOCKET_ACTION.RECEIVE_RESULT);
      socket.off(SOCKET_ACTION.SEND_ANSWER);
    };
  }, [slideState, slideNo]);

  useEffect(() => {
    socket.on(SOCKET_ACTION.RECEIVE_MESSAGE, (data) => {
      const { token, message } = data;
      const item = {
        message,
      }
      accessToken === token ? item.isMe = true : item.isMe=false;
      setMessageList([...messageList, item]);
    });


    return () => {
      socket.off(SOCKET_ACTION.RECEIVE_ANSWER);
    };
  }, [messageList.length]);

  if (slidesQuery.isLoading && isHostQuery.isLoading) {
    return <Loading />;
  }

  if (slidesQuery.isError && isHostQuery.isError) {
    return <div className="container mt-8">Error</div>;
  }

  if (!slidesQuery.data) {
    return <></>;
  }

  if (slidesQuery.data.length === 0) {
    return (
      <div className="container">
        <EndGame />
      </div>
    );
  }

  return (
    <div className="container">
      <Children
        slideState={slideState}
        gameName={gameName}
        slide={slidesQuery.data[0]}
        isHost={isHostQuery.data}
        setSlideState={setSlideState}
        accessToken={accessToken}
        code={code}
        socket={socket}
        result={result}
      />
      <div className="button-group d-flex">
        <button className="icon" onClick={() => setShowChatBox(!showChatBox)}>
          <MessageOutlined />
        </button>
        <button className="icon">
          <QuestionCircleOutlined />
        </button>
        {showChatBox && <ChatBox socket={socket} code={code} accessToken={accessToken} messageList={messageList}/>}
      </div>
    </div>
  );
};

export default Game;
