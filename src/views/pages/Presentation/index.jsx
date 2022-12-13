import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from 'views/components/Loading';
import {
  getPresentationByCodeAPI,
  getSlidesFromPresentCodeAPI,
} from 'api/PresentationAPI';
import { DeleteOutlined } from '@ant-design/icons';
import './style.scss';

//Presentation Edit
const Presentation = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const { code } = useParams();
  const [title, setTitle] = useState('');
  const [slides, setSlides] = useState([]);
  const slidesQuery = useQuery({
    queryKey: ['getSlide'],
    queryFn: async () => await getSlidesFromPresentCodeAPI(accessToken, code),
  });

  const presentQuery = useQuery({
    queryKey: ['getPresent'],
    queryFn: async () => await getPresentationByCodeAPI(accessToken, code),
  });

  useEffect(() => {
    if (presentQuery.data) {
      setTitle(presentQuery.data.name);
    }
  }, [presentQuery.isSuccess]);

  useEffect(() => {
    if (slidesQuery.data) {
      setSlides([...slidesQuery.data]);
    }
  }, [slidesQuery.isSuccess]);

  if (slidesQuery.isLoading && presentQuery.isLoading) {
    return <Loading />;
  }

  if (slidesQuery.isError && presentQuery.isError) {
    return <div>Error</div>;
  }

  const selectSlide = (slide) => {
    console.log(slide);
  };

  return (
    <div className="presentation-detail container pt-6 d-flex flex-column">
      <div className="header d-flex justify-end">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="primary small">Lưu</button>
      </div>
      <div className="body mt-4">
        <div className="slide-list d-flex">
          {slides.map((slide, index) => {
            return (
              <div
                className="item pa-2"
                key={index}
              >
                <div className="d-flex align-center justify-center " onClick={() => selectSlide(slide)}>{index + 1}</div>
                <button className="icon">
                  <DeleteOutlined />
                </button>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Presentation;
