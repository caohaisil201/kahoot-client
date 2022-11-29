import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const Member = ({ member, changeRole, deleteMember }) => {
  const { id, name, role } = member;
  const items = [
    {
      label: (
        <div>
          {role === 3 ? 'Chuyển thành Co-owner' : 'Chuyển thành member'}
        </div>
      ),
      key: '0',
    },
    {
      label: <div>Xóa khỏi nhóm</div>,
      key: '1',
    },
  ];



  const onMenuItemClick = ({ key }) => {
    switch (key) {
      case '0':
        changeRole(id);
        break;
      case '1':
        deleteMember(id);
        break;
    }
  };
  return (
    <div className="member d-flex justify-space-between align-center px-4">
      <div>{name}</div>
      {role !== 1 ? (
        <Dropdown
          menu={{
            items,
            onClick: onMenuItemClick,
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <button className="icon">
            <MoreOutlined />
          </button>
        </Dropdown>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Member;
