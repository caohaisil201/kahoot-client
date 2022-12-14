import React, { useEffect, useState } from 'react';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CustomCountDown from 'views/components/Countdown';
import { Checkbox } from 'antd';
import _debounce from 'lodash/debounce';

const Answer = ({ gameName, slide, isHost, setSlideState }) => {
  const [choicesSelected, setChoicesSelected] = useState([]);
  const onChange = (values) => {
    setChoicesSelected(values.sort());
  };

  const {question, choices} = slide;
  const onSubmit = _debounce(() => {
    if (choices.length <= 0) {
      console.log('Ban chua chon dap an');
      return;
    }
    // emit event to socket
    console.log(choicesSelected);
    setSlideState(2);
  }, 1000);

  useEffect(() => {
    // if (isHost) {
    //   const timer = setTimeout(() => {
    //     setSlideState(3);
    //   }, 5 * 1000);
    //   return () => {
    //     clearTimeout(timer);
    //   };
    // }
  }, []);

  return (
    <div className="answer mt-6">
      <div className="header">
        <h1>{gameName}</h1>
        <h2>{question}</h2>
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
          <CustomCountDown className="ml-2" value={20} />
        </div>
      </div>

      {isHost ? (
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
  );
};

export default Answer;
