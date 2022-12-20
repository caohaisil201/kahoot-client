import { fotgotPassword, loginUser } from 'api/AuthAPI';
import { useFormik } from 'formik';
import { useDocumentTitle } from 'hooks';
import React from 'react';
import Swal from 'sweetalert2';
import { Schema } from 'utils';
import './style.scss'
const ForgotPassword = () => {
	useDocumentTitle('Forgot Password');

	const validationSchema = Schema.validationEmail;
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				console.log('values', values.email);
				const isSuccessful = await fotgotPassword(values.email);
				console.log(isSuccessful);
				if (!isSuccessful) {
					Swal.fire({
						title: 'Error',
						text: 'Có lỗi xảy ra!',
						icon: 'error',
					});
				}
				else {
					Swal.fire({
						title: 'Lấy lại mật khẩu thành công',
						text: `Truy cập vào email ${values.email} để đặt lại mật khẩu`,
						icon: 'success',
					});
				}
				return;
			} catch (err) {
				throw err;
			}
		},
	});
	return (
		<section>
			<form className="infoform" onSubmit={formik.handleSubmit}>
				<h1>Lấy lại mật khẩu</h1>
				<p className='instruction'>Nhập email của bạn để lấy lại mật khẩu</p>
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

				<button type="submit" className="primary default">
					Lấy lại mật khẩu
				</button>

			</form>
		</section>
	);
};

export default ForgotPassword;