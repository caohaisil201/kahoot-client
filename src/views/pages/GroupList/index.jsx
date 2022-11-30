import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  BookOutlined,
  FileImageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { Schema } from 'utils';
import { useDocumentTitle } from 'hooks';
import { createGroupAPI, getListGroupAPI } from 'api/GroupAPI';
import 'antd/dist/antd.css';
import './style.scss';
import { useContext } from 'react';
import { Context } from 'store';

const GroupItem = ({ group }) => {
  const navigate = useNavigate();
  const { name, owner, description, capacity, code } = group;
  const goToCourse = () => {
    navigate(`/group/${code}`);
  };
  return (
    <div
      onClick={goToCourse}
      className="group-item pt-9 px-8 pb-5 d-flex flex-column justify-space-between"
    >
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
      <div className="foot">
        <UserOutlined /> {capacity} Người tham gia
      </div>
    </div>
  );
};

const GroupList = () => {
  useDocumentTitle('Danh sách nhóm');
  const { accessToken } = useContext(Context).accessTokenState;
  const [groups, setGroups] = useState([
    {
      id: 5,
      name: 'Group 1',
      owner: 'Nguyen Van A',
      description: 'Mô tả group',
      capacity: 50,
      code: '17sb1',
    },
  ]);
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
      const instanceGroups = await getListGroupAPI();
      if (!instanceGroups) {
        throw 'Something wrong!';
      }
      setGroups(instanceGroups);
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
              <h1 className="mb-0">danh sách các khóa học</h1>
            </div>
            <button onClick={openCreateGroupModal} className="primary large">
              Tạo khóa học
            </button>
          </section>
          <section className="groups mt-10">
            {groups.map((item) => (
              <GroupItem group={item} key={item.code} />
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
