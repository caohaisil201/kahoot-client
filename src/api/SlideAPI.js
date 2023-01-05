import axios from 'axios';
export const createSlideAPI = async (accessToken, slideInfo) => {
	const response = await axios
		.post(`${process.env.REACT_APP_API_URL}/slides/add`, slideInfo, {
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
export const updateSlidesAPI = async (accessToken, presentCode, slides) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/slides`,
			{ presentCode, slides },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => err);
	console.log('slides', response);
	const { meta, data } = response;
	return meta.code === 200 ? data : null;
};
export const deleteSlideAPI = async (accessToken, presentationCode, itemNo) => {
	const response = await axios
		.delete(
			`${process.env.REACT_APP_API_URL}/slides?${presentationCode}&${itemNo}`,
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
