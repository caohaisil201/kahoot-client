import * as yup from 'yup';

export const createGroupSchema = yup.object().shape({
	name: yup.string().required('Tên nhóm không được bỏ trống!'),
	description: yup.string().max(255, 'Không được vượt quá 255 kí tự'),
	maxUser: yup.number('Bạn phải nhập vào số'),
});
export const validationSignUpSchema = yup.object().shape({
	name: yup
		.string()
		.required('Username required')
		.min(4, 'Must be 4 characters or more'),
	email: yup
		.string()
		.required('Email required')
		.matches(
			/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			'Please enter a valid email address'
		),
	password: yup
		.string()
		.required('Password required')
		.matches(
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
			'Password must be 7-19 characters and contain at least one letter, one number and a special character'
		),
	confirmedPassword: yup
		.string()
		.required('Required')
		.oneOf([yup.ref('password'), null], 'Password must match'),
});
export const validationSignInSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email required')
		.matches(
			/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			'Please enter a valid email address'
		),
	password: yup
		.string()
		.required('Password required')
		.matches(
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
			'Password must be 7-19 characters and contain at least one letter, one number and a special character'
		),
});
