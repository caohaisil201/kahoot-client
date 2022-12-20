import axios from 'axios';

export const createGroupAPI = async (accessToken, groupInfo) => {
	const response = await axios
		.post(`${process.env.REACT_APP_API_URL}/group-management`, groupInfo, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => err);
	const { meta, data } = response;
	return meta.code === 200 ? data : null;
};

export const getListGroupAPI = async (accessToken) => {
	const response = await axios
		.get(`${process.env.REACT_APP_API_URL}/group-management`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => err);
	const { meta, data } = response;
	return meta.code === 200 ? data : null;
};

export const getGroupDetailAPI = async (accessToken, groupCode) => {
	const response = await axios
		.get(
			`${process.env.REACT_APP_API_URL}/group-management/detail?groupCode=${groupCode}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	const { meta, data } = response;
	return meta.code === 200 ? data : null;
};

export const getGroupMembersAPI = async (accessToken, groupCode) => {
	const response = await axios
		.get(
			`${process.env.REACT_APP_API_URL}/group-management/member?groupCode=${groupCode}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	const { meta, data } = response;
	return meta.code === 200 ? data : null;
};

export const addMemberAPI = async (
	accessToken,
	groupCode,
	email,
	roleType
) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/group-management/add`,
			{
				groupCode,
				email,
				roleType,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	return response;
};

export const assignMemberRoleAPI = async (
	accessToken,
	groupCode,
	userCode,
	roleType
) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/group-management/assign`,
			{
				groupCode,
				userCode,
				roleType,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	return response;
};

export const deleteMemberAPI = async (accessToken, groupCode, userCode) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/group-management/delete`,
			{
				groupCode,
				userCode,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	return response;
};

export const joinGroupByLinkAPI = async (accessToken, groupCode) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/group-management/join`,
			{
				groupCode,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	const { meta } = response;
	return !!(meta.code === 200);
};

export const deleteGroupAPI = async (accessToken, groupCode) => {
	const response = await axios
		.get(
			`${process.env.REACT_APP_API_URL}/group-management/delete?code=${groupCode}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
	console.log(response);
	return response;
};