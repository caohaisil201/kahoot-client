import React, { useEffect, useState } from 'react';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CustomCountDown from 'views/components/Countdown';
import { Checkbox, message } from 'antd';
import _debounce from 'lodash/debounce';
import { HELPER, SOCKET_ACTION } from 'utils';

const Answer = ({
  socket,
  accessToken,
  code,
  gameName,
  slide,
  isHost,
  setSlideState,
}) => {
  const [choicesSelected, setChoicesSelected] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (values) => {
    setChoicesSelected(values.sort());
  };

  useEffect(() => {
    if (isHost) {
      const result = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      };
      const timeId = setTimeout(() => {
        setSlideState(3);
        socket.emit(SOCKET_ACTION.SEND_RESULT, {
          presentCode: code,
          result,
        });
      }, timer * 1000);
      socket.on(SOCKET_ACTION.RECEIVE_ANSWER, (data) => {
        data.choices.forEach((choice) => {
          result[choice]++;
        });
      });
      return () => {
        clearTimeout(timeId);
        socket.off(SOCKET_ACTION.RECEIVE_ANSWER);
      };
    }
  }, []);

  if (!slide) {
    return <div className="container mt-8">Error</div>;
  }

  const { heading, paragraph, choices, timer } = slide;
  const onSubmit = _debounce(
    () => {
      if (choicesSelected.length <= 0) {
        messageApi.open({
          type: 'error',
          content: 'Bạn chưa chọn đáp án!',
        });
        return;
      }
      const correctChoices = choices.reduce((prev, cur) => {
        if (cur.isCorrect) {
          return [...prev, cur.icon];
        }
        return [...prev];
      }, []);
      const isCorrectAnswer = HELPER.compareArray(
        choicesSelected,
        correctChoices
      );
      // emit event to socket
      socket.emit(SOCKET_ACTION.SEND_ANSWER, {
        access_token: accessToken,
        socketId: socket.id,
        name: socket.id,
        presentCode: code,
        choices: choicesSelected,
        isCorrectAnswer,
      });
      setSlideState(2);
    },
    { leading: true, trailing: true },
    1000
  );

  if (!slide) {
    return <></>;
  }

  return (
    <>
      {contextHolder}
      <div className="answer mt-6">
        <div className="header">
          <h1>{gameName}</h1>
          <h2>{heading}</h2>
          <p>{paragraph || ''}</p>
        </div>
        <div className="statistic d-flex justify-end">
          {isHost ? (
            <div className="count-user">
              <UserOutlined />
              &nbsp;20
            </div>
          ) : (
            <></>
          )}
          <div className="count-down ml-4">
            <ClockCircleOutlined />
            &nbsp;
            <CustomCountDown className="ml-2" value={timer} />
          </div>
        </div>

        {isHost ? (
          choices.length !== 0 ? (
            <div className="answer-list d-flex">
              {choices.map((choice) => (
                <div className="answer-choice pa-2" key={choice.icon}>
                  <div className="owner-view d-flex align-center justify-center">
                    {choice.icon}. {choice.answer}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )
        ) : choices.length !== 0 ? (
          <Checkbox.Group className="answer-list d-flex" onChange={onChange}>
            {choices.map((choice) => {
              return (
                <div className="answer-choice pa-2" key={choice.icon}>
                  <Checkbox
                    className="d-flex align-center justify-center"
                    value={choice.icon}
                  >
                    {choice.icon}. {choice.answer}
                  </Checkbox>
                </div>
              );
            })}
          </Checkbox.Group>
        ) : (
          <></>
        )}

        {isHost ? (
          <></>
        ) : (
          <div className="mt-4 submit-answer d-flex align-center justify-center">
            <button onClick={onSubmit} className="primary medium">
              SUBMIT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Answer;
