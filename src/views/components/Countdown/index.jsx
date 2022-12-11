import React from 'react';
import Countdown from 'react-countdown';


const renderer = ({completed, seconds}) => {
  if(completed) {
    return <span>0</span>
  }else {
    return <span>{seconds}</span>
  }
}

const CustomCountDown = ({value}) => {
  return (
    <Countdown 
      date={Date.now() + value * 1000}
      renderer={renderer}
    />
  )
}

export default CustomCountDown