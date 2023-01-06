import React from 'react';
import { FundOutlined } from '@ant-design/icons';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { SOCKET_ACTION } from 'utils';

const Result = ({ presentCode, gameName, result, slide, isHost, setSlideState, socket }) => {
  const { choices } = slide;
  const trueValues = choices.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.icon]: cur.isCorrect,
    };
  }, {});

  const handleNextSlide = () => {
    socket.emit(SOCKET_ACTION.NEXT_SLIDE,{
      presentCode
    });
  }

  return (
    <div className="result mt-6 d-flex flex-column justify-space-between">
      <div className="header">
        <h1>{gameName}</h1>
      </div>
      <div className="sub-header d-flex align-center justify-space-between">
        <div className="title">
          <FundOutlined />
          &nbsp;&nbsp; THỐNG KÊ
        </div>
        {isHost ? (
          <button className="primary medium" onClick={handleNextSlide}>TIẾP THEO</button>
        ) : (
          <div>Bạn đã chọn đáp án A, B</div>
        )}
      </div>
      <div className="chart mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={40} data={result}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value">
              {result.map((item, index) => (
                <Cell
                  fill={trueValues[item.name] ? '#1c6758' : '#BBBBBB'}
                  key={index}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Result;
