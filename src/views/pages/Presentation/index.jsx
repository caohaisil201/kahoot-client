import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Tooltip } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import Loading from 'views/components/Loading';
import {
  getPresentationByCodeAPI,
  getSlidesFromPresentCodeAPI,
  updatePresentationAPI,
} from 'api/PresentationAPI';
import Slide from './Slide';
import './style.scss';
import { updateSlidesAPI } from 'api/SlideAPI';
import Swal from 'sweetalert2';

const Presentation = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const { code } = useParams();
  const [title, setTitle] = useState('');
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({});
  const [currentSlideNo, setCurrentSlideNo] = useState(1);

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
  const handleSubmit = async () => {
    if (title === '') return;
    const isUpdatePresentationSuccess = await updatePresentationAPI(
      accessToken,
      code,
      title
    );
    const isUpdateSlidesSuccess = await updateSlidesAPI(
      accessToken,
      code,
      slides
    );
    if (!isUpdatePresentationSuccess && isUpdateSlidesSuccess) {
      Swal.fire({
        title: 'Error',
        text: 'Có lỗi xảy ra',
        icon: 'error',
      });
    }

    // const
  };

  const selectSlide = (slide) => {
    setCurrentSlide(slide);
    setCurrentSlideNo(slide.itemNo);
  };

  const handleSaveSlide = (slide) => {
    let newSlide = slides.find((item) => item.itemNo === slide.itemNo);
    if (!!newSlide) {
      const tempSlides = [...slides];
      tempSlides.pop();
      tempSlides.push(slide);
      setSlides(tempSlides);
    }
  };

  const handleAddSlide = () => {
    setCurrentSlideNo(currentSlideNo + 1);
    const newSlide = {
      itemNo: slides.length + 1,
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (itemNo) => {
    const index = slides.findIndex((item) => item.itemNo === itemNo);
    if (index !== -1) {
      const tempSlides = [...slides];
      tempSlides.splice(index, 1);
      setSlides(tempSlides);
    }
  };

  return (
    <div className="presentation-detail container pt-6 d-flex flex-column">
      <div className="header d-flex justify-end">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* <button className="primary small">Tạo slide</button> */}
        <button
          className="primary small"
          style={{ marginLeft: '12px' }}
          onClick={handleSubmit}
        >
          Lưu
        </button>
      </div>
      <div className="body mt-4 d-flex justify-space-between">
        <div className="slide-list d-flex">
          {slides.map((slide, index) => {
            return (
              <div
                className="item pa-2"
                key={index}
                style={{
                  background: `#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`,
                }}
              >
                <div
                  className="d-flex align-center justify-center "
                  onClick={() => selectSlide(slide)}
                >
                  {slide.question}
                </div>
                <button
                  className="icon"
                  onClick={() => deleteSlide(slide.itemNo)}
                >
                  <Tooltip title="Xóa" color="#ff0000">
                    <DeleteFilled style={{ color: '#000' }} />
                  </Tooltip>
                </button>
              </div>
            );
          })}
          <div className="item pa-2">
            <div
              className="d-flex align-center justify-center "
              onClick={handleAddSlide}
            >
              <PlusOutlined />
            </div>
          </div>
        </div>
        <Slide slide={currentSlide} handleSaveSlide={handleSaveSlide} />
      </div>
    </div>
  );
};

export default Presentation;
