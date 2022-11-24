import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from 'store';
import { useDocumentTitle } from 'hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Schema } from 'utils';
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
  const { user } = context.userState;

  const createGroupSchema = Schema.createGroupSchema;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createGroupSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const createNewGroup = () => {
    setIsModalOpen(true);
  };

  const onSubmit = () => {
    console.log(123);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useLayoutEffect(() => {
    if (!isLogin) {
      navigate('/sign-in');
    }
  }, [isLogin]);
  console.log(isModalOpen);

  return (
    <>
      <div className="course-list">
        <div className="container d-flex flex-column">
          <section className="header pt-10 d-flex align-center justify-space-between">
            <div className="d-flex align-center">
              <BookOutlined />
              <h1>danh sách các khóa học</h1>
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
        onOk={onSubmit}
        onCancel={handleCancel}
        className="create-group-modal"
        footer={null}
      >
        <button type="submit" className="ant-btn ant-btn-primary">
          Tạo
        </button>
      </Modal>
    </>
  );
};

export default GroupList;
