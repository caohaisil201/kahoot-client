import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  LayoutOutlined,
  MoreOutlined,
  PlaySquareOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Modal, Radio } from 'antd';
import { CONSTANT, Schema } from 'utils';
import { useDocumentTitle } from 'hooks';
import { getListGroupAPI } from 'api/GroupAPI';
import 'antd/dist/antd.css';
import './style.scss';
import Loading from 'views/components/Loading';
import { Context } from 'store';
import {
  createPresentationAPI,
  deletePresentationAPI,
  getListPresentationAPI,
} from 'api/PresentationAPI';

const PresentationItem = ({ presentation, deletePresentation }) => {
  const navigate = useNavigate();
  const { code, name, host, description, create_at, numberOfSlides } =
    presentation;
  const goToPresentation = () => {
    navigate(`/presentation/${code}`);
  };
  const items = [
    {
      key: '0',
      label: <div>Chỉnh sửa</div>,
      icon: <EditOutlined />,
    },
    {
      key: '1',
      label: <div>Present</div>,
      icon: <PlaySquareOutlined />,
    },
    {
      key: '2',
      label: <div>Mời collaborator</div>,
      icon: <UserAddOutlined />,
    },
    {
      key: '3',
      label: <div style={{ color: '#ff0000' }}>Xóa presentation</div>,
      icon: <DeleteOutlined style={{ color: '#ff0000' }} />,
    },
  ];
  const onMenuItemClick = ({ key }) => {
    switch (key) {
      case '0':
        goToPresentation();
        break;
      case '1':
        //Present this presentation;
        break;
      case '2':
        //Add collab
        break;
      case '3':
        deletePresentation(code);
        break;
      default:
        break;
    }
  };
  console.log(host)
  return (
    <div className="presentation-item pt-9 px-8 pb-5 d-flex flex-column justify-space-between">
      <div className="head d-flex justify-space-between align-center">
        <div className="info">
          <h2>{name}</h2>
          {/* {create_at} */}
          {host.fullName}
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
            placement="bottomRight"
          >
            <Button key={code} className="icon">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const PresentationList = () => {
  useDocumentTitle('Danh sách presentation');
  // const accessToken = useContext(Context).accessTokenState;
  const accessToken = sessionStorage.getItem('access_token');
  const [presentations, setPresentations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreatePresentationModal = () => {
    setIsModalOpen(true);
  };

  const createNewPresentation = async () => {
    try {
      const instancePresentationInfo = await createPresentationAPI(
        accessToken,
        formik.values
      );
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
  });

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
      mutation.mutate(values);
      console.log('form value', values);
      setIsModalOpen(false);
      resetForm();
    },
  });

  const getListPresentation = async () => {
    try {
      const instancePresentations = await getListPresentationAPI(accessToken);
      console.log(instancePresentations);
      if (!instancePresentations) {
        throw 'Something wrong!';
      }
      setPresentations(instancePresentations);
    } catch (err) {
      throw err;
    }
  };
  const deletePresentation = async (presentationCode) => {
    const instancePresentation = await presentations.find(
      (presentation) => presentation.code === presentationCode
    );

    if (!!instancePresentation) {
      const isSuccessful = await deletePresentationAPI(
        accessToken,
        presentationCode
      );
      if (!isSuccessful) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Có lỗi xảy ra',
        });
        return;
      }
    }
    setPresentations(
      presentations.filter(
        (presentation) => presentation.code !== presentationCode
      )
    );
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
      <div className="presentation-list">
        <div className="container d-flex flex-column">
          <section className="header pt-10 d-flex align-center justify-space-between">
            <div className="d-flex align-center">
              <UnorderedListOutlined />
              <h1 className="mb-0">danh sách các Presentation</h1>
            </div>
            <button
              onClick={openCreatePresentationModal}
              className="primary default"
            >
              Tạo Presentation
            </button>
          </section>
          <section className="presentations mt-10">
            {presentations.map((item) => (
              <PresentationItem
                presentation={item}
                key={item.code}
                deletePresentation={deletePresentation}
              />
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
          <label htmlFor="presentation-name-input">
            Nhập tiêu đề <span style={{ color: '#36B5B0' }}>*</span>
          </label>
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
            resize={false}
          />
          <div className="error">
            {formik.errors.description && <p>{formik.errors.description}</p>}
          </div>
          <label htmlFor="presentation-desc-input">
            Chọn loại presentation: <span style={{ color: '#36B5B0' }}>*</span>
          </label>
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
          <label htmlFor="presentation-in-group-input">
            Chọn nhóm <span style={{ color: '#36B5B0' }}>*</span>
          </label>
          <select
            id="presentation-in-group-input"
            name="groupCode"
            value={formik.values.groupCode}
            onChange={formik.handleChange}
          >
            <option value="">Chọn nhóm</option>
            {groupQuery.data.map((group) => (
              <option key={group.code} value={group.code}>
                {group.name}
              </option>
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
            <button
              type="submit"
              className="ant-btn ant-btn-primary"
              style={{ marginLeft: '12px' }}
            >
              Tạo
            </button>
          </footer>
        </form>
      </Modal>
    </>
  );
};

export default PresentationList;
