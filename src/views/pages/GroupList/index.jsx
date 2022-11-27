import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from 'store';
import { useDocumentTitle } from 'hooks';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { Schema } from 'utils';
import axios from 'axios';
import {
  BookOutlined,
  FileImageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';

/**
 * This component will get course list from api
 * Data below is example
 */

const groups = [
  {
    id: 1,
    name: 'Group 1',
    owner: 'Nguyen Van A',
    description: 'Mô tả group',
    totalUser: 50,
  },
  {
    id: 2,
    name: 'Group 1',
    owner: 'Nguyen Van A',
    description: 'Mô tả group',
    totalUser: 50,
  },
  {
    id: 3,
    name: 'Group 1',
    owner: 'Nguyen Van A',
    description: 'Mô tả group',
    totalUser: 50,
  },
  {
    id: 4,
    name: 'Group 1',
    owner: 'Nguyen Van A',
    description: 'Mô tả group',
    totalUser: 50,
  },
  {
    id: 5,
    name: 'Group 1',
    owner: 'Nguyen Van A',
    description: 'Mô tả group',
    totalUser: 50,
  },
];

const GroupItem = ({ group }) => {
  const navigate = useNavigate();
  const { id, name, owner, description, totalUser } = group;
  const goToCourse = () => {
    navigate(`/group/${id}`);
  };
  return (
    <div
      onClick={goToCourse}
      className="group-item pt-9 px-8 pb-5 d-flex flex-column justify-space-between"
    >
      <div className="head d-flex justify-space-between align-center">
        <div className="info">
          <h2>{name}</h2>
          <p>{owner}</p>
        </div>
        <div className="image">
          <FileImageOutlined />
        </div>
      </div>
      <div className="body mt-4">{description}</div>
      <div className="foot">
        <UserOutlined /> {totalUser} Người tham gia
      </div>
    </div>
  );
};

const GroupList = () => {
  useDocumentTitle('Course List');
  const navigate = useNavigate();
  const context = useContext(Context);
  const isLogin = context.loginState.isLogin;

  const createNewGroup = () => {
    setIsModalOpen(true);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['createGroup'],
    queryFn: createGroup,
  })

  const createGroup = () => {
    
  }

  const createGroupSchema = Schema.createGroupSchema;
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      maxUser: 20,
    },
    validationSchema: createGroupSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setIsModalOpen(false);
      resetForm();
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  useLayoutEffect(() => {
    if (!isLogin) {
      navigate('/sign-in');
    }
  }, [isLogin]);

  return (
    <>
      <div className="course-list">
        <div className="container d-flex flex-column">
          <section className="header pt-10 d-flex align-center justify-space-between">
            <div className="d-flex align-center">
              <BookOutlined />
              <h1 className="mb-0">danh sách các khóa học</h1>
            </div>
            <button onClick={createNewGroup} className="primary large">
              Tạo khóa học
            </button>
          </section>
          <section className="groups mt-10">
            {groups.map((item) => (
              <GroupItem group={item} key={item.id} />
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
            name="maxUser"
            type="number"
            value={formik.values.maxUser}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.maxUser && <p>{formik.errors.maxUser}</p>}
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
