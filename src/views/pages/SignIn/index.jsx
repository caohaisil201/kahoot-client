import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from 'hooks';
import { Schema } from '../../../utils';
import { loginUser } from 'api/AuthAPI';
import 'antd/dist/antd.css';
import './style.scss';
import { Divider } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
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
    onSubmit: async (values) => {
      try {
        console.log(values);
        const responseSignIn = await loginUser(values.email, values.password);
        const { data, status } = responseSignIn;
        if (status !== 200) return;

        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        navigate('/');
      } catch (err) {
        throw err;
      }
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

        <button type="submit" className="primary default">
          Đăng nhập
        </button>
		<Divider>Hoặc</Divider>
		<GoogleLogin
		clientId={process.env.GOOGLE_CLIENT_ID}
		buttonText="Sign in with Google"
		// onSuccess={onSuccess}
		// onFailure={onFailure}
		/>
      </form>
    </section>
  );
};

export default SignUp;
