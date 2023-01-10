import React from 'react';
import { SOCKET_ACTION } from 'utils';
import { FundOutlined } from '@ant-design/icons';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { Tabs } from 'antd';

const Result = ({
  presentCode,
  gameName,
  result,
  listAnswer,
  slide,
  isHost,
  setSlideState,
  socket,
}) => {
  const { choices } = slide;
  const trueValues = choices.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.icon]: cur.isCorrect,
    };
  }, {});

  const handleNextSlide = () => {
    socket.emit(SOCKET_ACTION.NEXT_SLIDE, {
      presentCode,
    });
  };

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
          <button className="primary medium" onClick={handleNextSlide}>
            TIẾP THEO
          </button>
        ) : (
          <div>Bạn đã chọn đáp án A, B</div>
        )}
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Biểu đồ',
            key: '1',
            children: (
              <div className="chart mt-8">
                <ResponsiveContainer width="100%" height={280}>
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
            ),
          },
          {
            label: 'Danh sách',
            key: '2',
            children: (
              <div className="list-answer">
                {listAnswer.map((item, index) => {
                  const date = new Date(item.time);
                  return (
                    <div key={index}>
                      {item.fullName} đã chọn
                      {item.choices.map((choice, i) => (
                        <strong key={i}> {choice}</strong>
                      ))}
                      &nbsp;vào lúc {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
                    </div>
                  );
                })}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Result;
