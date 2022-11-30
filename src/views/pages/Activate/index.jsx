import { activateAccount } from 'api/AuthAPI';
import React, {useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const Activate = () => {
  const {token} = useParams();
  const navigate = useNavigate();
  const joinGroup = async () => {
      const groupCode = await activateAccount(token);
      if(groupCode) {
        navigate(`/group/${groupCode}`);
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Có lỗi xảy ra!',
      })
  }
  useEffect(() => {
    if(!!token) {
      joinGroup();
    }
  }, [token]);
  return (
    <div className="d-flex align-center justify-center">Tài khoản của bạn đã được kích hoạt, <Link to="/sign-in">Ấn vào đây để vè trang đăng nhập</Link></div>
  )
}

export default Activate