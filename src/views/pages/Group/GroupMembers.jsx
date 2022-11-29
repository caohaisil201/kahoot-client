import React, { useState } from 'react';
import Member from './Member';
import { UserAddOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const GroupMembers = ({ groupId }) => {
  const inviteLink = 'http//localhost:3000/invite/groupId';
  /**
   * Data below is example
   * Will get Data from API by mutate
   */
  const [list, setList] = useState([
    {
      id: 1,
      name: 'Owner',
      role: 1,
    },
    {
      id: 2,
      name: 'Co-owner',
      role: 2,
    },
    {
      id: 3,
      name: 'First member',
      role: 3,
    },
    {
      id: 4,
      name: 'Second member',
      role: 3,
    },
    {
      id: 5,
      name: 'Second member',
      role: 3,
    },
    {
      id: 31,
      name: 'First member',
      role: 3,
    },
    {
      id: 41,
      name: 'Second member',
      role: 3,
    },
    {
      id: 51,
      name: 'Second member',
      role: 3,
    },
  ]);
  const [isInviteCoOwnerModalOpen, setIsInviteCoOwnerModalOpen] =
    useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
  const handleCancel = () => {
    setIsInviteCoOwnerModalOpen(false);
    setIsInviteMemberModalOpen(false);
  };
  const manager = [];
  const normalMember = [];
  list.forEach((member) => {
    if (member.role === 3) {
      normalMember.push(member);
    } else {
      manager.push(member);
    }
  });

  const changeRole = (id) => {
    const instanceMember = list.find((member) => member.id === id);
    if (!!instanceMember) {
      // send API and get list again
      // then setList()
      instanceMember.role = instanceMember.role === 3 ? 2 : 3;
      setList([...list]);
    }
  };

  const deleteMember = (id) => {
    // Send api to delete member
    console.log(groupId, id);
  };

  return (
    <>
      <div className="group-members">
        <div className="group-management">
          <div className="header d-flex align-center justify-space-between pr-4">
            <div className="role">Quản lý nhóm</div>
            <button
              className="icon"
              onClick={() => setIsInviteCoOwnerModalOpen(true)}
            >
              <UserAddOutlined />
            </button>
          </div>
          <div className="list">
            {manager.map((member) => (
              <Member
                key={member.id}
                member={member}
                changeRole={changeRole}
                deleteMember={deleteMember}
              />
            ))}
          </div>
        </div>
        <div className="normal-member mt-2">
          <div className="header d-flex align-center justify-space-between pr-4">
            <div className="role">Thành viên</div>
            <div>
              {`${normalMember.length} người`}
              <button
                className="icon ml-4"
                onClick={() => setIsInviteMemberModalOpen(true)}
              >
                <UserAddOutlined />
              </button>
            </div>
          </div>
          <div className="list">
            {normalMember.map((member) => (
              <Member
                key={member.id}
                member={member}
                changeRole={changeRole}
                deleteMember={deleteMember}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        title="Mời Co-owner"
        open={isInviteCoOwnerModalOpen}
        onCancel={handleCancel}
        className="invite-modal"
        footer={null}
      >
        <p className="invite-description">Mô tả về quyền của co-owner</p>
        <form
          className="d-flex flex-column"
          // onSubmit={formik.handleSubmit}
        >
          <label htmlFor="group-name-input">Nhập email *</label>
          <input
            id="group-name-input"
            name="name"
            value="123"
            // value={formik.values.name}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
          />
          <div className="error">
            {/* {formik.errors.name && <p>{formik.errors.name}</p>} */}
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
              Thêm
            </button>
          </footer>
        </form>
      </Modal>
      <Modal
        title="Mời Member"
        open={isInviteMemberModalOpen}
        onCancel={handleCancel}
        className="invite-modal"
        footer={null}
      >
        <p className="invite-description">Mô tả về quyền của member</p>
        <form
          className="d-flex flex-column"
          // onSubmit={formik.handleSubmit}
        >
          <div className="invite-link mb-4 d-flex align-center justify-space-between">
            <div>
              Mời bằng đường link: <span>{inviteLink}</span>
            </div>
            <button
              type="button"
              className="icon"
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
                Swal.fire({
                  title: 'Đã copy',
                  position: 'top-right',
                  timer: 1000,
                  showConfirmButton: false,
                  width: '200px',
                });
              }}
            >
              <CopyOutlined />
            </button>
          </div>
          <p className="or">Hoặc</p>
          <label htmlFor="group-name-input">Nhập email *</label>
          <input
            id="group-name-input"
            name="name"
            value="123"
            // value={formik.values.name}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
          />
          <div className="error">
            {/* {formik.errors.name && <p>{formik.errors.name}</p>} */}
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
              Thêm
            </button>
          </footer>
        </form>
      </Modal>
    </>
  );
};

export default GroupMembers;
