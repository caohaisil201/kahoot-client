import React from 'react';
import { useParams } from 'react-router-dom';

const Group = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <div>
      <div className="container">
        Group {id}
      </div>
    </div>
  )
}

export default Group