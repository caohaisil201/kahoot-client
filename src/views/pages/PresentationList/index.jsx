import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  BookOutlined,
  FileImageOutlined,
  LayoutOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Dropdown, Modal, Radio } from 'antd';
import { CONSTANT, Schema } from 'utils';
import { useDocumentTitle } from 'hooks';
import { getListGroupAPI } from 'api/GroupAPI';
import 'antd/dist/antd.css';
import './style.scss';
import Loading from 'views/components/Loading';

const PresentationItem = ({ presentation }) => {
  const navigate = useNavigate();
  const { id, name, description, create_at, numberOfSlides } = presentation;
  const goToCourse = () => {
    // navigate(`/presentation/${code}`);
  };
  const items = [
    {
      label: <div>Mời collaboration</div>,
      key: `0`,
    },
    {
      label: <div>Xóa presentation</div>,
      key: `1`,
    },
  ];
  const onMenuItemClick = ({ key }) => {
    console.log(key);
  };
  return (
    <div className="presentation-item pt-9 px-8 pb-5 d-flex flex-column justify-space-between">
      <div className="head d-flex justify-space-between align-center">
        <div className="info">
          <h2 onClick={goToCourse}>{name}</h2>
          {create_at}
        </div>
        <div className="image">
          <FileImageOutlined />
        </div>
      </div>
      <div className="body mt-4">{description}</div>
      <div className="foot d-flex align-center justify-space-between">
        <div>
          <LayoutOutlined /> {numberOfSlides} slides
        </div>
        <div>
          <Dropdown
            menu={{
              items,
              onClick: onMenuItemClick,
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <button key={id} className="icon">
              <MoreOutlined />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const PresentationList = () => {
  useDocumentTitle('Danh sách nhóm');
  const accessToken = sessionStorage.getItem('access_token');
  const [presentations, setPresentations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreatePresentationModal = () => {
    setIsModalOpen(true);
  };

  const createNewPresentation = async () => {
    try {
      const instancePresentationInfo = {};
      // const instancePresentationInfo = await createPresentationAPI(
      //   accessToken,
      //   formik.values
      // );
      if (!instancePresentationInfo) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Tạo presentation thất bại',
          timer: 1500,
        });
        return;
      }
      setPresentations([...presentations, instancePresentationInfo]);
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Tạo presentation thất bại',
        timer: 1500,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: createNewPresentation,
  });

  const groupQuery = useQuery({
    queryKey: ['group-query'],
    queryFn: () => getListGroupAPI(accessToken),
    retry: false,
  });

  // if(groupQuery.data) {
  //   console.log(groupQuery.data);
  // }

  const createPresentationSchema = Schema.createPresentationSchema;
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      type: CONSTANT.PRESENTATION_TYPE.PRIVATE,
      groupCode: '',
    },
    validationSchema: createPresentationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // mutation.mutate(values);
      setIsModalOpen(false);
      resetForm();
    },

    onChange: (values) => {
      console.log(values);
    },

    handleChange: (e, values) => {
      console.log(e)
    }
  });

  const getListPresentation = async () => {
    try {
      const instancePresentations = [
        {
          id: 1,
          name: 'Name',
          create_at: 'Ngày tạo',
          description: 'Mô tả presentation',
          numberOfSlides: 2,
        },
        {
          id: 2,
          name: 'Name',
          create_at: 'Ngày tạo',
          description: 'Mô tả presentation',
          numberOfSlides: 2,
        },
      ];
      // const instancePresentations = await getListPresentationAPI(accessToken);
      if (!instancePresentations) {
        throw 'Something wrong!';
      }
      setPresentations(instancePresentations);
    } catch (err) {
      throw err;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  if (mutation.isLoading) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Đang tạo presentation',
      timer: 1500,
    });
  }

  useEffect(() => {
    getListPresentation();
  }, []);

  if (groupQuery.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="course-list">
        <div className="container d-flex flex-column">
          <section className="header pt-10 d-flex align-center justify-space-between">
            <div className="d-flex align-center">
              <BookOutlined />
              <h1 className="mb-0">danh sách các Presentation</h1>
            </div>
            <button
              onClick={openCreatePresentationModal}
              className="primary large"
            >
              Tạo Presentation
            </button>
          </section>
          <section className="presentations mt-10">
            {presentations.map((item, index) => (
              <PresentationItem presentation={item} key={index} />
            ))}
          </section>
        </div>
      </div>
      <Modal
        title="Tạo presentation mới"
        open={isModalOpen}
        onCancel={handleCancel}
        className="create-presentation-modal"
        footer={null}
      >
        <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
          <label htmlFor="presentation-name-input">Nhập tiêu đề *</label>
          <input
            id="presentation-name-input"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.name && <p>{formik.errors.name}</p>}
          </div>
          <label htmlFor="presentation-desc-input">Mô tả</label>
          <textarea
            id="presentation-desc-input"
            name="description"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.description && <p>{formik.errors.description}</p>}
          </div>
          <Radio.Group
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <Radio value={CONSTANT.PRESENTATION_TYPE.PRIVATE}>Private</Radio>
            <Radio value={CONSTANT.PRESENTATION_TYPE.PUBLIC}>Public</Radio>
          </Radio.Group>
          <div className="error">
            {formik.errors.type && <p>{formik.errors.type}</p>}
          </div>
          <label htmlFor="presentation-in-group-input">Chọn nhóm</label>
          <select
            id="presentation-in-group-input"
            name="groupCode"
            value={formik.values.groupCode}
            onChange={formik.handleChange}
            placeholder="Chọn nhóm"
          >
            <option value="" style={{opacity: 0.5,}}>Hãy chọn nhóm chứa presentation</option>     
            {groupQuery.data.map((group) => (
              <option key={group.code} value={group.code}>{group.name}</option>
            ))}
          </select>
          <div className="error">
            {formik.errors.groupCode && <p>{formik.errors.groupCode}</p>}
          </div>
          <footer className="mt-4 d-flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="ant-btn cancel-btn"
            >
              Hủy
            </button>
            <button type="submit" className="ml-3 ant-btn ant-btn-primary">
              Tạo
            </button>
          </footer>
        </form>
      </Modal>
    </>
  );
};

export default PresentationList;
