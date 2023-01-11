import axios from "axios";

export const getMeAPI = async (accessToken) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/user-management/getme`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then(res => res.data)
  .catch(err => err);
  const {meta, data} = response;
  return meta.code === 200 ? data : null;
};
