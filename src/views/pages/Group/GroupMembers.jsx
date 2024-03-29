import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { UserAddOutlined, CopyOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { CONSTANT } from 'utils';
import { inviteSchema } from 'utils/yupSchema';
import {
  addMemberAPI,
  assignMemberRoleAPI,
  getGroupMembersAPI,
  deleteMemberAPI,
} from 'api/GroupAPI';
import Loading from 'views/components/Loading';
import Member from './Member';

const GroupMembers = ({ accessToken, groupCode }) => {
  const inviteLink = `${process.env.REACT_APP_FRONTEND_URL}/invite/${groupCode}`;
  const [isInviteCoOwnerModalOpen, setIsInviteCoOwnerModalOpen] =
    useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
  const list = useQuery({
    queryKey: ['groupMembers'],
    queryFn: async () => await getGroupMembersAPI(accessToken, groupCode),
    enabled: false,
  });

  useEffect(() => {
    if (!!accessToken) {
      list.refetch();
    }
  }, [accessToken]);

  const addCoOwnerFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: inviteSchema,
    onSubmit: async (values, { resetForm }) => {
      const isSuccessful = await addMemberAPI(
        accessToken,
        groupCode,
        values.email,
        CONSTANT.USER_ROLE.CO_OWNER
      );
      if (isSuccessful === true) {
        setIsInviteCoOwnerModalOpen(false);
        resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thêm co-owner thành công!',
          timer: 1000,
        });
        list.refetch();
      } else {
        const { meta } = isSuccessful;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${meta.message}`,
          timer: 1000,
        });
      }
    },
  });

  const addMemberFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: inviteSchema,
    onSubmit: async (values, { resetForm }) => {
      const isSuccessful = await addMemberAPI(
        accessToken,
        groupCode,
        values.email,
        CONSTANT.USER_ROLE.MEMBER
      );
      if (isSuccessful === true) {
        setIsInviteMemberModalOpen(false);
        resetForm();
        list.refetch();
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thêm member thành công!',
          position: 'top-end',
          timer: 1000,
        });
      } else {
        const { meta } = isSuccessful;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${meta.message}`,
          timer: 1000,
        });
      }
    },
  });

  if (list.isLoading) {
    return <Loading />;
  }

  if (list.isError) {
    return <div>Có lỗi xảy ra</div>;
  }

  const handleCancel = () => {
    setIsInviteCoOwnerModalOpen(false);
    setIsInviteMemberModalOpen(false);
  };

  const manager = [];
  const normalMember = [];
  list.data.forEach((member) => {
    if (member.role === CONSTANT.USER_ROLE.MEMBER) {
      normalMember.push(member);
    } else {
      manager.push(member);
    }
  });

  const changeRole = async (userCode, toRole) => {
    const instanceMember = list.data.find((member) => member.code === userCode);
    if (!!instanceMember) {
      const isSuccessful = await assignMemberRoleAPI(
        accessToken,
        groupCode,
        userCode,
        toRole
      );
      if (!isSuccessful) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Có lỗi xảy ra',
        });
        return;
      }
      list.refetch();
    }
  };

  const deleteMember = async (userEmail) => {
    const instanceMember = list.data.find(
      (member) => member.email === userEmail
    );
    if (!!instanceMember) {
      const response = await deleteMemberAPI(accessToken, groupCode, userEmail);
      const { meta } = response;
      if (meta.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Xóa thành công!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${meta.message}`,
        });
        list.refetch();
      }
    }
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
                key={member.code}
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
                key={member.code}
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
          onSubmit={addCoOwnerFormik.handleSubmit}
        >
          <label htmlFor="co-owner-email-input">Nhập email *</label>
          <input
            id="co-owner-email-input"
            name="email"
            value={addCoOwnerFormik.values.email}
            onBlur={addCoOwnerFormik.handleBlur}
            onChange={addCoOwnerFormik.handleChange}
          />
          <div className="error">
            {addCoOwnerFormik.errors.email && (
              <p>{addCoOwnerFormik.errors.email}</p>
            )}
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
          onSubmit={addMemberFormik.handleSubmit}
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
            name="email"
            value={addMemberFormik.values.email}
            onBlur={addMemberFormik.handleBlur}
            onChange={addMemberFormik.handleChange}
          />
          <div className="error">
            {addMemberFormik.errors.email && (
              <p>{addMemberFormik.errors.email}</p>
            )}
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
