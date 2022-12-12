import React, { useState } from 'react';
import './style.scss';
import Answer from './Answer';
import Waiting from './Waiting';
import Result from './Result';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSlideNoByGameCodeAPI, isHostAPI } from 'api/GameAPI';
import Loading from 'views/components/Loading';

const Game = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const { state } = useLocation();
  const { gameName } = state;

  const { code } = useParams();

  const [slideState, setSlideState] = useState(1);
  const [slideNo, setSlideNo] = useState(0);

  const slidesQuery = useQuery({
    queryKey: ['getSlides'],
    queryFn: async () =>
      await getSlideNoByGameCodeAPI(accessToken, code, slideNo),
  });

  const isHostQuery = useQuery({
    queryKey: ['getIsHost'],
    queryFn: async () => await isHostAPI(accessToken, code),
  });

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
