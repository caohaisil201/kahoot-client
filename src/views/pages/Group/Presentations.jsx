import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from 'views/components/Loading';
import { getPresentationsByGroupAPI, startPresentation } from 'api/PresentationAPI';
import { SocketContext } from 'store/socket';
import { SOCKET_ACTION } from 'utils';
import { useNavigate } from 'react-router-dom';

const Presentations = ({ accessToken, groupCode }) => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem('user_info'));

  const presentationList = useQuery({
    queryKey: ['presentation'],
    queryFn: async () =>
      await getPresentationsByGroupAPI(accessToken, groupCode),
  });

  const onClickStart = async (item) => {
    await startPresentation(accessToken, item.code);
    socket.emit(SOCKET_ACTION.JOIN_GAME, {
      presentCode: item.code,
    });
    socket.emit(SOCKET_ACTION.START_GAME, {
      presentCode: item.code,
    });
    socket.emit(SOCKET_ACTION.NOTIFY_GROUP_GAME_START, {
      groupCode,
      presentCode: item.code,
    });
    navigate(`/game/${item.code}`, { state: { gameName: item.name } });
  };

  if (presentationList.isLoading) {
    return <Loading />;
  }

  if (presentationList.isError) {
    return <div>Error</div>;
  }

  if (!presentationList.data) {
    return <div>Không có presentation nào!</div>;
  }

  console.log(presentationList.data)

  return (
    <div className="presentations">
      <h2>Presentations</h2>
      {presentationList.data.map((item, index) => {
        return (
          <div
            className="item px-4 py-2 mb-2 d-flex align-center justify-space-between"
            key={index}
          >
            {item.code} - {item.name}
            {item.isRunning ? <div>Playing</div> : (item.host.code === userInfo.code && <button
              className="small outline"
              onClick={() => onClickStart(item)}
            >
              Start
            </button>)} 
          </div>
          
        );
      })}
    </div>
  );
};

export default Presentations;
