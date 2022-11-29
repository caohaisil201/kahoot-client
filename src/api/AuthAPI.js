import axios from 'axios';
import { CONSTANT } from 'utils';
export const registerUser = async (username, email, password, fullName) => {
  try {
    const response = await axios
      .post(`${process.env.REACT_API_URL}/auth/register`, {
        username: username,
        password: password,
        email: email,
        fullName: fullName,
      })
      .catch((error) => {
        if (error.response) {
          const objectReturn = {
            data: error.response.data,
            status: error.response.status,
          };
          return objectReturn;
        }
      });
    return !!(response.meta.code === 200);
  } catch (err) {
    console.log('err', err);
  }
};
export const loginUser = async (email, password) => {
  const response = await axios
    .post(`${process.env.REACT_API_URL}/auth/login`, {
      username: email,
      password,
    })
    .catch((error) => {
      if (error.response) {
        const objectReturn = {
          data: error.response.data,
          status: error.response.status,
        };
        return objectReturn;
      }
    });
  const { data } = response;
  const accessToken = data.access_token;
	return accessToken ? accessToken : null;
};
export const loginWithGoogle = async (credential) => {
  const response = await axios
    .post(`${process.env.REACT_API_URL}/auth/login-google`, {
      credential,
    })
    .catch((error) => {
      if (error.response) {
        const objectReturn = {
          data: error.response.data,
          status: error.response.status,
        };
        return objectReturn;
      }
    });
  const { data, status } = response;
  const objectReturn = {
    data: data,
    status: status,
  };
  return objectReturn;
};
