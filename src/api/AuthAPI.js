import axios from 'axios';

export const registerUser = async (username, email, password, fullName) => {
  try {
    const response = await axios
      .post(`${process.env.REACT_APP_API_URL}/registration`, {
        username: username,
        password: password,
        email: email,
        fullName: fullName,
      })
      .then((res) => res.data)
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
    return false;
  }
};

export const loginUser = async (email, password) => {
  const response = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        username: email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        const objectReturn = {
          data: error.response.data,
          status: error.response.status,
        };
        return objectReturn;
      }
    });
  console.log(response);
  const accessToken = response.access_token;
  return accessToken ? accessToken : null;
};

export const loginWithGoogle = async (credential) => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login-google`, {
      credential,
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        const objectReturn = {
          data: error.response.data,
          status: error.response.status,
        };
        return objectReturn;
      }
    });

  return response;
};

export const activateAccountAPI = async (token) => {
  const response = await axios
    .get(`${process.env.REACT_APP_API_URL}/registration/confirm?token=${token}`)
    .then((res) => res.data)
    .catch((err) => err);
  return !!response.meta.code;
};

export const forgotPassword = async (email) => {
  const response = await axios
    .get(
      `${process.env.REACT_APP_API_URL}/user-management/reset-password?username=${email}`
    )
    .then((res) => res.data)
    .catch((err) => err);
  const { meta } = response;
  return !!(meta.code === 200);
};

export const resetPassword = async (email, password) => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/user-management/update-password`, {
      username: email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err);
  const { meta } = response;
  return !!(meta.code === 200);
};
