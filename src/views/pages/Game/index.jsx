import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SocketContext } from 'store/socket';
import { getSlideNoByGameCodeAPI, isHostAPI } from 'api/GameAPI';
import Loading from 'views/components/Loading';
import Answer from './Answer';
import Waiting from './Waiting';
import Result from './Result';
import './style.scss';
import { SOCKET_ACTION } from 'utils';

const Game = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const socket = useContext(SocketContext);
  const { state } = useLocation();
  const { gameName } = state;

  const { code } = useParams();

  const [slideState, setSlideState] = useState(1);
  const [slideNo, setSlideNo] = useState(0);
  const [slide, setSlide] = useState({});

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
    socket.on(SOCKET_ACTION.NEXT_SLIDE, (data) => {
      // set Slide number to call api
      // slidesQuery.refetch();
      // setSlideNo()
    });

    socket.on(SOCKET_ACTION.SEND_RESULT, (data) => {});

    socket.on(SOCKET_ACTION.SEND_ANSWER, (data) => {});

    return () => {
      socket.off(SOCKET_ACTION.NEXT_SLIDE);
      socket.off(SOCKET_ACTION.SEND_RESULT);
      socket.off(SOCKET_ACTION.SEND_ANSWER);
    };
  }, [slideState, slideNo]);

  if (slidesQuery.isLoading && isHostQuery.isLoading) {
    return <Loading />;
  }

  if (slidesQuery.isError && isHostQuery.isError) {
    return <div>Error</div>;
  }

  switch (slideState) {
    case 1:
      return slidesQuery.data.length >= 0 ? (
        <div className="container">
          <Answer
            gameName={gameName}
            slide={slidesQuery.data[0]}
            isHost={isHostQuery.data}
            setSlideState={setSlideState}
            accessToken={accessToken}
          />
        </div>
      ) : (
        <></>
      );
    case 2:
      return (
        <div className="container">
          <Waiting gameName={gameName} setSlideState={setSlideState} />
        </div>
      );
    case 3:
      return (
        <div className="container">
          <Result
            gameName={gameName}
            isHost={isHostQuery.data}
            setSlideState={setSlideState}
          />
        </div>
      );
    default:
      return <></>;
  }
};

export default Game;
