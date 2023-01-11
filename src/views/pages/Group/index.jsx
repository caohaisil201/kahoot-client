import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { useDocumentTitle } from 'hooks';
import GroupDetail from './GroupDetail';
import GroupMembers from './GroupMembers';
import Presentations from './Presentations';
import 'antd/dist/antd.css';
import './style.scss';

const Group = () => {
  useDocumentTitle('Thông tin nhóm');
  const { id } = useParams();
  const accessToken = sessionStorage.getItem('access_token');
  return (
    <div className="group-detail">
      <div className="container d-flex justify-center">
        <div className="tabs-content">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: 'Thông tin nhóm',
                key: '1',
                children: (
                  <GroupDetail accessToken={accessToken} groupCode={id} />
                ),
              },
              {
                label: 'Danh sách thành viên',
                key: '2',
                children: (
                  <GroupMembers accessToken={accessToken} groupCode={id} />
                ),
              },
              {
                label: 'Danh sách presentation',
                key: '3',
                children: (
                  <Presentations accessToken={accessToken} groupCode={id} />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Group;
