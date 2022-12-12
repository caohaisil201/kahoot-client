import React from 'react'
import Loading from 'views/components/Loading'

const Waiting = ({setSlideState}) => {
  // socket listen to change screen 3

  return (
    <div className="waiting mt-6 d-flex flex-column justify-space-between">
      <div className="header">
        <h1>Quiz title</h1>
      </div>
      <Loading />
      <h2>Bạn vừa trả lời xong <br/> Vui lòng đợi một xíu nhé!</h2>
    </div>
  )
}

export default Waiting