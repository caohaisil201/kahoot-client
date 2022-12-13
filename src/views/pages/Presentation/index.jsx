import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from 'views/components/Loading';
import {
  getPresentationByCodeAPI,
  getSlidesFromPresentCodeAPI,
} from 'api/PresentationAPI';

//Presentation Edit
const Presentation = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const { code } = useParams();
  const [title, setTitle] = useState('');
  const slidesQuery = useQuery({
    queryKey: ['getSlide'],
    queryFn: async () => await getSlidesFromPresentCodeAPI(accessToken, code),
  });

  const presentQuery = useQuery({
    queryKey: ['getPresent'],
    queryFn: async () => await getPresentationByCodeAPI(accessToken, code),
  });

  if (slidesQuery.isLoading && presentQuery.isLoading) {
    return <Loading />;
  }

  if (slidesQuery.isError && presentQuery.isError) {
    return <div>Error</div>;
  }

  // console.log(slidesQuery.data);
  console.log(presentQuery.data);

  return (
    <div className="container pt-6 d-flex flex-column">
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
				<button className="primary medium">Lưu</button>
      </div>
      <div>
        <div className="slide-list"></div>
        <div></div>
      </div>
    </div>
  );
};

export default Presentation;
