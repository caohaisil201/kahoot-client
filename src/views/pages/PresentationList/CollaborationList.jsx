import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { inviteSchema } from 'utils/yupSchema';
import Loading from 'views/components/Loading';
import {
  addCollaborationAPI,
  deleteCollaborationAPI,
  getPresentationCollaborationsAPI,
} from 'api/PresentationAPI';
import { useParams } from 'react-router-dom';
import './style.scss';
import Collaborator from './Collaborator';
const CollaborationList = () => {
  const accessToken = sessionStorage.getItem('access_token');
  const { code } = useParams();
  const [isInviteCollabModalOpen, setIsInviteCollabModalOpen] = useState(false);
  const list = useQuery({
    queryKey: ['presentationMembers'],
    queryFn: async () =>
      await getPresentationCollaborationsAPI(accessToken, code),
    enabled: false,
  });

  useEffect(() => {
    if (!!accessToken) {
      list.refetch();
    }
  }, [accessToken]);

  const addCollaborationsFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: inviteSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await addCollaborationAPI(
        accessToken,
        code,
        values.email
      );
      const { meta } = response;
      if (meta.code === 200) {
        setIsInviteCollabModalOpen(false);
        resetForm();
        list.refetch();
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thêm thành công!',
          timer: 1000,
        });
      } else {
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
    setIsInviteCollabModalOpen(false);
  };
  const deleteMember = async (email) => {
    const instanceMember = list.data.find((member) => member.email === email);
    if (!!instanceMember) {
      const response = await deleteCollaborationAPI(accessToken, code, email);
      const { meta } = response;
      if (meta.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Xóa thành công!',
        });
        list.refetch();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${meta.message}`,
        });
      }
    }
  };

  return (
    <>
      <div className="container d-flex align-center">
        <div className="group-members ">
          <div className="collab mt-2 ">
            <div className="header d-flex align-center justify-space-between pr-4">
              <div className="role">Danh sách collaborators</div>
              <div>
                {`${list.data.length} người`}
                <button
                  className="icon ml-4"
                  onClick={() => setIsInviteCollabModalOpen(true)}
                >
                  <UserAddOutlined />
                </button>
              </div>
            </div>
            <div className="list">
              {list.data.map((member) => (
                <Collaborator
                  key={member.id}
                  member={member}
                  deleteMember={deleteMember}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Mời Collaborator"
        open={isInviteCollabModalOpen}
        onCancel={handleCancel}
        className="invite-modal"
        footer={null}
      >
        <p className="invite-description">
          Collaborator là người có thể xem và chỉnh sửa presentation
        </p>
        <form
          className="d-flex flex-column"
          onSubmit={addCollaborationsFormik.handleSubmit}
        >
          <label htmlFor="group-name-input">Nhập email *</label>
          <input
            id="group-name-input"
            name="email"
            value={addCollaborationsFormik.values.email}
            onBlur={addCollaborationsFormik.handleBlur}
            onChange={addCollaborationsFormik.handleChange}
          />
          <div className="error">
            {addCollaborationsFormik.errors.email && (
              <p>{addCollaborationsFormik.errors.email}</p>
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

export default CollaborationList;
