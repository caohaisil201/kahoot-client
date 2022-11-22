import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from 'hooks';
import { useContext } from 'react';
import { Schema } from '../../../utils';
import 'antd/dist/antd.css';
import * as Yup from 'yup';
import './style.scss';

const SignUp = () => {
  useDocumentTitle('Sign Up');
  const navigate = useNavigate();

  const validationSchema = Schema.validationSignInSchema;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      window.alert('Form submitted');
      console.log(values);
    },
  });

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
          type="text"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}

        <button type="submit" className="primary default">
          Đăng nhập
        </button>
      </form>
    </section>
  );
};

export default SignUp;
