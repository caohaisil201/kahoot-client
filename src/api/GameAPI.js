import axios from 'axios';

export const findGameByCodeAPI = async (accessToken, gameCode) => {
  const response = await axios
    .get(`${process.env.REACT_APP_API_URL}/presentations?code=${gameCode}`, {
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

export const getSlideNoByGameCodeAPI = async (
  accessToken,
  gameCode,
  itemNo
) => {
  const response = await axios
    .get(
      `${process.env.REACT_APP_API_URL}/slides?presentCode=${gameCode}&itemNo=${itemNo}`,
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

export const isHostAPI = async (accessToken, gameCode) => {
  const response = await axios
    .get(
      `${process.env.REACT_APP_API_URL}/presentations/check-host?presentCode=${gameCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err);
  const {meta, data} = response;
  return meta.code === 200 ? data : null;
};
