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

const Result = ({ gameName, isHost, setSlideState }) => {
  const trueValues = [1, 2];
  const data = [
    {
      name: 'A',
      key: 1,
      value: 20,
    },
    {
      name: 'B',
      key: 2,
      value: 30,
    },
    {
      name: 'C',
      key: 3,
      value: 40,
    },
    {
      name: 'D',
      key: 4,
      value: 10,
    },
  ];

  // socket listen to change slideState

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
          <button className="primary medium">TIẾP THEO</button>
        ) : (
          <div>Bạn đã chọn đáp án A, B</div>
        )}
      </div>
      <div className="chart mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={40} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value">
              {data.map((item, index) => (
                <Cell
                  fill={
                    trueValues.find((number) => item.key === number)
                      ? '#1c6758'
                      : '#BBBBBB'
                  }
                  key={item.key}
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
