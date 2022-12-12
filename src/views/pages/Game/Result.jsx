import React from 'react';
import { FundOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Result = ({ userProfile, setSlideState }) => {
  const { role } = userProfile;
  const trueValue = 1;
  const labels = ['A', 'B', 'C', 'D '];
  const result = [20, 30, 40, 100];
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: result,
        backgroundColor: result.map((item, index) =>
          index === trueValue ? '#1c6758' : '#BBBBBB'
        ),
      },
    ],
  };

  // socket listen to change slideState

  return (
    <div className="result mt-6 d-flex flex-column justify-space-between">
      <div className="header">
        <h1>Quiz title</h1>
      </div>
      <div className="sub-header d-flex align-center justify-space-between">
        <div className="title">
          <FundOutlined />
          &nbsp;&nbsp; THỐNG KÊ
        </div>
        {role === 'OWNER' ? (
          <button className="primary medium">TIẾP THEO</button>
        ) : (
          <div>Bạn đã chọn đáp án A, B</div>
        )}
      </div>
      <div className="chart">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Result;
