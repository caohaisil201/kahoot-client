import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Tooltip, message } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import Loading from 'views/components/Loading';
import Slide from './Slide';
import Swal from 'sweetalert2';
import {
  getPresentationByCodeAPI,
  getSlidesFromPresentCodeAPI,
  updatePresentationAPI,
} from 'api/PresentationAPI';
import { updateSlidesAPI } from 'api/SlideAPI';
import './style.scss';

const Presentation = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const { code } = useParams();
  const [title, setTitle] = useState('');
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({});
  const [currentSlideNo, setCurrentSlideNo] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

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
    if (!isUpdatePresentationSuccess || !isUpdateSlidesSuccess) {
      Swal.fire({
        title: 'Error',
        text: 'Có lỗi xảy ra',
        icon: 'error',
      });
      return;
    }
    messageApi.open({
      type: 'success',
      content: 'Cập nhật slide thành công!',
    });
  };

  const selectSlide = (slide) => {
    setCurrentSlide(slide);
    setCurrentSlideNo(slide.itemNo);
  };

  const handleSaveSlide = (slide) => {
    const index = slides.findIndex((item) => item.itemNo === slide.itemNo);
    if (index === -1) {
      messageApi.open({
        type: 'error',
        content: 'An error occur!',
      });
      return;
    }
    slides[index] = {
      ...slide,
    };
    setSlides([...slides]);
    messageApi.open({
      type: 'success',
      content: 'Success!',
    });
  };

  const handleAddSlide = () => {
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
    <>
      {contextHolder}
      <div className="presentation-detail container pt-6 d-flex flex-column">
        <div className="header d-flex justify-end">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
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
                  className={`item pa-2 ${
                    index + 1 === currentSlideNo ? 'select' : ''
                  }`}
                  key={index}
                >
                  <span className="index">{index + 1}</span>
                  <div
                    className="d-flex align-center justify-center "
                    onClick={() => selectSlide(slide)}
                  >
                    {slide.heading || 'New slide'}
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
    </>
  );
};

export default Presentation;
