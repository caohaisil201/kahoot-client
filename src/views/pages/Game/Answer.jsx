import React, { useEffect, useState } from 'react';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CustomCountDown from 'views/components/Countdown';
import { Checkbox } from 'antd';
import _debounce from 'lodash/debounce';

const Answer = ({ userProfile, setSlideState }) => {
  const { role } = userProfile;
  const answerList = [
    {
      key: 'A',
      value: 'Answer A',
    },
    {
      key: 'B',
      value: 'Answer B',
    },
    {
      key: 'C',
      value: 'Answer C',
    },
    {
      key: 'D',
      value: 'Answer D',
    },
  ];
  const [choices, setChoices] = useState([]);
  const onChange = (values) => {
    setChoices(values.sort());
  };

  const onSubmit = _debounce(() => {
    if (choices.length <= 0) {
      console.log('Ban chua chon dap an');
      return;
    }
    // emit event to socket
    console.log(choices);
    setSlideState(2);
  }, 1000);

  useEffect(() => {
    if (role === 'OWNER') {
      const timer = setTimeout(() => {
        setSlideState(3);
      }, 5 * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className="answer mt-6">
      <div className="header">
        <h1>Quiz title!</h1>
        <h2>Question hereeeeeeeeeeeeeeeeeee!</h2>
      </div>
      <div className="statistic d-flex justify-end">
        {role === 'OWNER' ? (
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

      {role === 'OWNER' ? (
        <div className="answer-list d-flex">
          {answerList.map((answer) => (
            <div className="answer-choice pa-2" key={answer.key}>
              <div className="owner-view d-flex align-center justify-center">
                {answer.key}. {answer.value}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Checkbox.Group className="answer-list d-flex" onChange={onChange}>
          {answerList.map((answer) => {
            return (
              <div className="answer-choice pa-2" key={answer.key}>
                <Checkbox
                  className="d-flex align-center justify-center"
                  value={answer.key}
                >
                  {answer.key}. {answer.value}
                </Checkbox>
              </div>
            );
          })}
        </Checkbox.Group>
      )}

      {role === 'OWNER' ? (
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
