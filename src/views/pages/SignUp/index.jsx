import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from 'hooks';
import { Schema } from '../../../utils';
import { registerUser } from 'api/AuthAPI';
import Swal from 'sweetalert2';
import { message } from 'antd';
import './style.scss';
import 'antd/dist/antd.css';
const SignUp = () => {
  useDocumentTitle('Sign Up');

  const validationSchema = Schema.validationSignUpSchema;
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const isSuccessful = await registerUser(
        values.email,
        values.email,
        values.password,
        values.name
      );

      if(!isSuccessful) {
        Swal.fire({
          title: 'Lỗi',
          text: 'Đăng ký thất bại',
          icon: 'error',
        })
        return;
      }
      message.info('Đăng ký thành công, kiểm tra email để kích hoạt tài khoản!')
    },
  });

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <h1 className="welcome">Chào mừng bạn đến với Edubox!</h1>
        <span>
          <em>Bạn đã có tài khoản? </em>
          <span>
            <Link to="/sign-in" className="sign-in">
              <strong>Đăng nhập</strong>
            </Link>
          </span>
        </span>
        <label>
          {' '}
          Họ tên <span style={{ color: '#36B5B0' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name"
        />
        {formik.errors.name && (
          <p className="errorMsg"> {formik.errors.name} </p>
        )}
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
        <label>
          {' '}
          Confirm Password <span style={{ color: '#36B5B0' }}>*</span>
        </label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
        />
        {formik.errors.confirmedPassword && (
          <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
        )}

        <button type="submit" className="primary default">
          Đăng ký
        </button>
      </form>
    </section>
  );
};

export default SignUp;
