import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from 'hooks';
import { Schema } from '../../../utils';
import { loginUser, loginWithGoogle } from 'api/AuthAPI';
import 'antd/dist/antd.css';
import './style.scss';
import { Divider } from 'antd';
import { Context } from 'store';
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { getMeAPI } from 'api/UserAPI';
const SignIn = () => {
  useDocumentTitle('Sign In');
  const navigate = useNavigate();
  const { accessTokenState } = useContext(Context);
  const validationSchema = Schema.validationSignInSchema;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const instanceAccessToken = await loginUser(
          values.email,
          values.password
        );

        if (!instanceAccessToken) {
          Swal.fire({
            title: 'Error',
            text: 'Có lỗi xảy ra!',
            icon: 'error',
          });
          return;
        }
        sessionStorage.setItem('access_token', instanceAccessToken);
        accessTokenState.setAccessToken(instanceAccessToken);
        const userInfo = await getMeAPI(instanceAccessToken);
        if(userInfo) {
          sessionStorage.setItem('user_info', JSON.stringify(userInfo));
        }
        navigate('/');
      } catch (err) {
        throw err;
      }
    },
  });
  const handleGoogleLogin = async (values) => {
    try {
      const responseLoginWithGoogle = await loginWithGoogle(values.credential);
      const { data, status } = responseLoginWithGoogle;
      if (status !== 200) return;

      const accessToken = data;
      sessionStorage.setItem('access_token', accessToken);
      accessTokenState.setAccessToken(accessToken);
      const userInfo = await getMeAPI(accessToken);
      if(userInfo) {
        sessionStorage.setItem('user_info', JSON.stringify(userInfo));
      }
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      navigate('/');
    }
  }, []);

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <h1 className="welcome">Chào mừng bạn đến với Edubox!</h1>
        <span>
          <em>Bạn chưa có tài khoản? </em>
          <span>
            <Link to="/sign-up" className="sign-up">
              <strong>Đăng ký</strong>
            </Link>
          </span>
        </span>

        <label>
          {' '}
          Email <span style={{ color: '#36B5B0' }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}
        <label>
          {' '}
          Password <span style={{ color: '#36B5B0' }}>*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
        <span>
          <em>Quên mật khẩu? </em>
          <span>
            <Link to="/forgot-password" className="sign-up">
              <strong>Đặt lại mật khẩu</strong>
            </Link>
          </span>
        </span>
        <button type="submit" className="primary default">
          Đăng nhập
        </button>
        <Divider>Hoặc</Divider>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {}}
        />
      </form>
    </section>
  );
};

export default SignIn;
