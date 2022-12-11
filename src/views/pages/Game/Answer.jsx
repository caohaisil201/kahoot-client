import React from 'react';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CustomCountDown from 'views/components/Countdown';

const Answer = ({ userProfile }) => {
  const { role } = userProfile;
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
      <div className="answer-list d-flex">
        <div className="answer-choice pa-2">
          <div className="d-flex align-center justify-center">adasd</div>
        </div>
        <div className="answer-choice pa-2">
          <div className="d-flex align-center justify-center">adasd</div>
        </div>
        <div className="answer-choice pa-2">
          <div className="d-flex align-center justify-center">adasd</div>
        </div>
        <div className="answer-choice pa-2">
          <div className="d-flex align-center justify-center">adasd</div>
        </div>
      </div>
      {role === 'OWNER' ? (
        <></>
      ) : (
        <div className="mt-4 submit-answer d-flex align-center justify-center">
          <button className="primary medium">
            SUBMIT
          </button>
        </div>
      )}
    </div>
  );
};

export default Answer;
