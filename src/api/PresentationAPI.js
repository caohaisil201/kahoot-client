import axios from 'axios';

export const createPresentationAPI = async (accessToken, presentationInfo) => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/presentations`, presentationInfo, {
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

export const getPresentationByCodeAPI = async (accessToken, presentCode) => {
  const response = await axios
    .get(`${process.env.REACT_APP_API_URL}/presentations?code=${presentCode}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
  const { meta, data } = response;
  return meta.code === 200 ? data[0] : null;
};

export const getListPresentationAPI = async (accessToken) => {
  const response = await axios
    .get(`${process.env.REACT_APP_API_URL}/presentations`, {
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

export const addMemberAPI = async (accessToken, groupCode, email, roleType) => {
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

export const getPresentationCollaborationsAPI = async (accessToken, presentationCode) => {
	const response = await axios
		.get(
			`${process.env.REACT_APP_API_URL}/collaborator/?presentCode=${presentationCode}`,
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

export const addCollaborationAPI = async (accessToken, presentCode, email) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/collaborator/add`,
			{
				presentCode,
				email,
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
export const deleteCollaborationAPI = async (accessToken, presentCode, email) => {
	const response = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/collaborator/delete`,
			{
				presentCode,
				email,
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

export const deletePresentationAPI = async (accessToken, presentationCode) => {
  const response = await axios
    .get(
      `${process.env.REACT_APP_API_URL}/presentations/delete?code=${presentationCode}`,
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

export const getSlidesFromPresentCodeAPI = async (accessToken, presentCode) => {
  const response = await axios
    .get(`${process.env.REACT_APP_API_URL}/slides?presentCode=${presentCode}`, {
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

export const updatePresentationAPI = async (accessToken, code, name) => {
  const response = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/presentations/update`,
      { code, name },
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
