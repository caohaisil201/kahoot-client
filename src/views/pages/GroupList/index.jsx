import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  MoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Modal } from 'antd';
import { Schema } from 'utils';
import { useDocumentTitle } from 'hooks';
import { createGroupAPI, deleteGroupAPI, getListGroupAPI } from 'api/GroupAPI';
import 'antd/dist/antd.css';
import './style.scss';

const GroupItem = ({ group, deleteGroup }) => {
  const navigate = useNavigate();
  const { name, owner, description, capacity, code, total } = group;
  const goToCourse = () => {
    navigate(`/group/${code}`);
  };
  const items = [
    {
      key: '0',
      label: <div>Xem thông tin</div>,
      icon: <EditOutlined />,
    },

    {
      key: '1',
      label: <div style={{ color: '#ff0000' }}>Xóa nhóm</div>,
      icon: <DeleteOutlined style={{ color: '#ff0000' }} />,
    },
  ];
  const onMenuItemClick = ({ key }) => {
    switch (key) {
      case '0':
        goToCourse();
        break;
      case '1':
        deleteGroup(code);
        break;
      default:
        break;
    }
  };
  return (
    <div className="group-item pt-9 px-8 pb-5 d-flex flex-column justify-space-between">
      <div className="head d-flex justify-space-between align-center">
        <div className="info">
          <h2>{name}</h2>
          <p>{owner.fullName}</p>
        </div>
        <div className="image">
          <FileImageOutlined />
        </div>
      </div>
      <div className="body mt-4">{description}</div>
      <div className="foot d-flex align-center justify-space-between">
        <div>
          <UserOutlined /> {total} Người tham gia
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

const GroupList = () => {
  useDocumentTitle('Danh sách nhóm');
  const accessToken = sessionStorage.getItem('access_token');
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateGroupModal = () => {
    setIsModalOpen(true);
  };

  const createNewGroup = async () => {
    try {
      const instanceGroupInfo = await createGroupAPI(
        accessToken,
        formik.values
      );
      if (!instanceGroupInfo) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Tạo nhóm thất bại',
          timer: 1500,
        });
        return;
      }
      setGroups([...groups, instanceGroupInfo]);
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Tạo nhóm thất bại',
        timer: 1500,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: createNewGroup,
  });

  const createGroupSchema = Schema.createGroupSchema;
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      capacity: 20,
    },
    validationSchema: createGroupSchema,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      setIsModalOpen(false);
      resetForm();
    },
  });

  const getListGroup = async () => {
    try {
      const instanceGroups = await getListGroupAPI(accessToken);
      if (!instanceGroups) {
        throw { message: 'Something wrong!' };
      }
      setGroups(instanceGroups);
    } catch (err) {
      throw err;
    }
  };
  const deleteGroup = async (groupCode) => {
    const instanceGroup = groups.find((group) => group.code === groupCode);

    if (!!instanceGroup) {
      const response = await deleteGroupAPI(accessToken, groupCode);
      const { meta } = response;
      const isSuccessful = !!(meta.code === 200);
      if (!isSuccessful) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${meta.message}`,
        });
        return;
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Xóa thành công!',
        });
      }
    }
    setGroups(groups.filter((group) => group.code !== groupCode));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  if (mutation.isLoading) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Đang tạo nhóm',
      timer: 1500,
    });
  }

  useEffect(() => {
    getListGroup();
  }, []);

  return (
    <>
      <div className="course-list">
        <div className="container d-flex flex-column">
          <section className="header pt-10 d-flex align-center justify-space-between">
            <div className="d-flex align-center">
              <BookOutlined />
              <h1 className="mb-0">danh sách các nhóm</h1>
            </div>
            <button onClick={openCreateGroupModal} className="primary large">
              Tạo nhóm
            </button>
          </section>
          <section className="groups mt-10">
            {groups.map((item) => (
              <GroupItem
                group={item}
                key={item.code}
                deleteGroup={deleteGroup}
              />
            ))}
          </section>
        </div>
      </div>
      <Modal
        title="Tạo nhóm mới"
        open={isModalOpen}
        onCancel={handleCancel}
        className="create-group-modal"
        footer={null}
      >
        <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
          <label htmlFor="group-name-input">Tên nhóm</label>
          <input
            id="group-name-input"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.name && <p>{formik.errors.name}</p>}
          </div>
          <label htmlFor="group-desc-input">Mô tả</label>
          <textarea
            id="group-desc-input"
            name="description"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            resize={false}
          />
          <div className="error">
            {formik.errors.description && <p>{formik.errors.description}</p>}
          </div>
          <label htmlFor="group-max-user-input">Số người tối đa</label>
          <input
            id="group-max-user-input"
            name="capacity"
            type="number"
            value={formik.values.capacity}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.capacity && <p>{formik.errors.capacity}</p>}
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

export default GroupList;
