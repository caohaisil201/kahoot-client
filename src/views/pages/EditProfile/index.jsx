import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import './style.scss';
import { Context } from 'store';
import axios from 'axios';
const Profile = () => {
	const { REACT_APP_SERVER_URL } = process.env;
	const { userState } = useContext(Context);

	const LoadProfile = async () => {
		try {
			const response = await axios.get(`${REACT_APP_SERVER_URL}/profile`);
			userState.setUser(response.data);
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		LoadProfile();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const handleChange = (event) => {
		userState.setUser({
			...userState.user,
			[event.target.name]: event.target.value,
		});
	};
	const submitFormEditProdile = async () => {
		try {
			await axios.post(`${REACT_APP_SERVER_URL}/profile`, userState.user);
			LoadProfile();
		} catch (error) {
			throw error;
		}
	};
	return (
		<section>
			<form className="infoform">
				<h1 className="info">Thông tin người dùng</h1>
				<label>
					{' '}
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={userState.user.email}
					disabled
				/>
				<label>
					{' '}
					Tên
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={userState.user.name}
					onChange={handleChange}
				/>
				<button type="submit" className="primary default" onClick={submitFormEditProdile}>
					Cập nhật
				</button>
			</form>
		</section >
	);
};

export default Profile;