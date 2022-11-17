import React, { useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from 'store';
import { useDocumentTitle } from 'hooks';
import { BookOutlined } from '@ant-design/icons';
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

const GroupItem = ({group}) => {
  const {name, owner, description, totalUser} = group;
  return (
    <div className="group-item pt-9 px-8 pb-5 d-flex flex-column justify-space-between">
      <div className="head">{name}</div>
      <div className="total">{totalUser}</div>
    </div>
  )
}

const CourseList = () => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const isLogin = context.isLogin;

  useDocumentTitle('Course List');

  useLayoutEffect(() => {
    if (!isLogin) {
      navigate('/sign-in');
    }
  }, [isLogin]);

  return (
    <div className="course-list">
      <div className="container d-flex flex-column">
        <section className="header pt-16 d-flex align-center justify-space-between">
          <div className="d-flex align-center">
            <BookOutlined />
            <h1>danh sách các khóa học</h1>
          </div>
          <button className="primary large">
            Tạo khóa học
          </button>
        </section>
        <section className="groups">
          {groups.map(item => (
            <GroupItem group={item} key={item.id}/>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CourseList;
