import axios from 'axios';

export const createGroupAPI = async (accessToken, groupInfo) => {
  const response = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/group-management`,
      {
        payload: groupInfo,
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
  memberEmail,
  role
) => {
  const response = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/group-management/assign`,
      {
        groupCode,
        memberEmail,
        role,
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

export const changeGroupMemberRoleAPI = async (
  accessToken,
  groupCode,
  memberId
) => {};

export const joinGroupByLinkAPI = async (accessToken, groupCode) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/group-management/assign`,
    {
      groupCode,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then(res => res.data).catch(err => err);
  const {meta} = response;
  return !!(meta.code === 200);
};
