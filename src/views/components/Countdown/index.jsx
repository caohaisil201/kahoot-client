import React from 'react';
import Countdown from 'react-countdown';

const Renderer = ({ completed, seconds }) => {
  if (completed) {
    return <span>0</span>;
  } else {
    return <span>{seconds}</span>;
  }
};

const CustomCountDown = React.memo(({ value }) => {
  return <Countdown date={Date.now() + value * 1000} renderer={Renderer} />;
});

export default CustomCountDown;
