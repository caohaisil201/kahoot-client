import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { CONSTANT } from 'utils';

const Member = ({ member, changeRole, deleteMember }) => {
  const { id, name, role, code } = member;
  const items = [
    {
      label: (
        <div>
          {role === CONSTANT.USER_ROLE.MEMBER
            ? 'Chuyển thành Co-owner'
            : 'Chuyển thành member'}
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
        const toRole =
          role === CONSTANT.USER_ROLE.MEMBER
            ? CONSTANT.USER_ROLE.CO_OWNER
            : CONSTANT.USER_ROLE.MEMBER;
        changeRole(code, toRole);
        break;
      case '1':
        deleteMember(code);
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
