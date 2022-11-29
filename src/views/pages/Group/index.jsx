import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import Loading from 'views/components/Loading';
import { useDocumentTitle } from 'hooks';
import 'antd/dist/antd.css';
import './style.scss';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import GroupMembers from './GroupMembers';

/**
 * Exmaple with role
 * 1: Owner
 * 2: Co-owner
 * 3: member
 */

const Group = () => {
  useDocumentTitle('Thông tin nhóm');
  const { id } = useParams();
  const [groupInfo, setGroupInfo] = useState({});
  const { members, setMembers } = useState([]);

  const getGroupInfo = () => {};

  const getMembers = () => {};

  const getGroupInfoMutate = useMutation({
    mutationFn: getGroupInfo,
    onError: () => {
      Swal.fire({
        title: 'Error',
        text: 'Something wroing',
        timer: 2000,
      });
    },
  });

  //Get group information, group's members by API with params id
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="group-detail">
      <div className="container d-flex justify-center">
        <div className="tabs-content">
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: 'Thông tin nhóm',
                key: '1',
                // children: getGroupInfoMutate.isLoading ? <Loading /> : <GroupInfo />
                children: <Loading />,
              },
              {
                label: 'Danh sách thành viên',
                key: '2',
                // children: getGroupInfoMutate.isLoading ? <Loading /> : <Members />
                children: <GroupMembers groupId={id}/>,
              },
              {
                label: 'Quiz',
                key: '3',
                children: 'Quiz',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Group;
