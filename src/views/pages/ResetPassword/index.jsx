import { resetPassword } from 'api/AuthAPI';
import { useFormik } from 'formik';
import { useDocumentTitle } from 'hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Schema } from 'utils';

const ResetPassword = () => {
	useDocumentTitle('Reset Password');
	const navigate = useNavigate();

	const validationSchema = Schema.validationResetPassword;
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmedPassword: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			const isSuccessful = await resetPassword(values.email, values.password);

			console.log('values reseet', values);
			if (!isSuccessful) {
				Swal.fire({
					title: 'Lỗi',
					text: 'Đặt lại mật khẩu không thành công',
					icon: 'error',
				})
			}
			else {
				Swal.fire({
					title: 'Đặt lại mật khẩu thành công',
					text: 'Vui lòng đăng nhập lại để truy cập vào website',
					icon: 'success',
				})
				navigate('/sign-in');
			}
			return;
		},
	});

	return (
		<section>
			<form className="infoform" onSubmit={formik.handleSubmit}>
				<h1 className="welcome">Đặt lại mật khẩu</h1>


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
					Đặt lại mật khẩu
				</button>
			</form>
		</section>
	);
};

export default ResetPassword;