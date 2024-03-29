import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { activateAccountAPI } from 'api/AuthAPI';
import Swal from 'sweetalert2';

const Activate = () => {
  const { token } = useParams();
  useEffect(() => {
    const activate = async () => {
      return await activateAccountAPI(token);
    };
    if (!!token) {
      const isSuccessful = activate();
      if (isSuccessful) {
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Có lỗi xảy ra!',
      });
    }
  }, [token]);
  return (
    <div className="d-flex align-center justify-center ma-8">
      Tài khoản của bạn đã được kích hoạt.
      <Link to="/sign-in">Ấn vào đây để về trang đăng nhập</Link>
    </div>
  );
};

export default Activate;
