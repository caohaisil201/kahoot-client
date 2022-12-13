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
import { usePrevious } from 'hooks';

const Game = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const socket = useContext(SocketContext);
  const { code } = useParams();
  const { state } = useLocation();
  const { gameName } = state;

  const [slideState, setSlideState] = useState(1);
  const [slideNo, setSlideNo] = useState(0);
  const [result, setResult] = useState([]);
  const prevSlideNo = usePrevious(slideNo);
  // const [slide, setSlide] = useState({});

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
    if(prevSlideNo !== slideNo) {
      slidesQuery.refetch();
    }

    socket.on(SOCKET_ACTION.NEXT_SLIDE, (data) => {
      if(data.presentCode === code) {
        setSlideNo(slideNo + 1);
        setSlideState(1);
      }
    });

    socket.on(SOCKET_ACTION.RECEIVE_RESULT, (data) => {
      const tempResult = [];
      Object.keys(data.result).forEach(item => {
        tempResult.push({
          name: item,
          key: item,
          value: data.result[item],
        })
      })
      setResult([...tempResult]);
      setSlideState(3);
    });

    socket.on(SOCKET_ACTION.SEND_ANSWER, (data) => {});

    return () => {
      socket.off(SOCKET_ACTION.NEXT_SLIDE);
      socket.off(SOCKET_ACTION.RECEIVE_RESULT);
      socket.off(SOCKET_ACTION.SEND_ANSWER);
    };
  }, [slideState, slideNo]);

  if (slidesQuery.isLoading && isHostQuery.isLoading) {
    return <Loading />;
  }

  if (slidesQuery.isError && isHostQuery.isError) {
    return <div className="container mt-8">Error</div>;
  }

  switch (slideState) {
    case 1:
      return slidesQuery.data && slidesQuery.data.length >= 0 ? (
        <div className="container">
          <Answer
            gameName={gameName}
            slide={slidesQuery.data[0]}
            isHost={isHostQuery.data}
            setSlideState={setSlideState}
            accessToken={accessToken}
            code={code}
            socket={socket}
          />
        </div>
      ) : (
        <></>
      );
    case 2:
      return (
        <div className="container">
          <Waiting
            gameName={gameName}
            setSlideState={setSlideState}
          />
        </div>
      );
    case 3:
      return (
        <div className="container">
          <Result
            gameName={gameName}
            slide={slidesQuery.data[0]}
            isHost={isHostQuery.data}
            setSlideState={setSlideState}
            result={result}
          />
        </div>
      );
    default:
      return <></>;
  }
};

export default Game;
