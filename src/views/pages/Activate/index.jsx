import { activateAccount } from 'api/AuthAPI';
import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const Activate = () => {
  const {token} = useParams();
  useEffect(() => {
    if(!!token) {
      const isSuccessful = activateAccount(token);
      if(isSuccessful) {
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Có lỗi xảy ra!',
      })
    }
  }, [token]);
  return (
    <div className="d-flex align-center justify-center">Tài khoản của bạn đã được kích hoạt, <Link to="/sign-in">Ấn vào đây để vè trang đăng nhập</Link></div>
  )
}

export default Activate