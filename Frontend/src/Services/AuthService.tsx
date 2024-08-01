import axios from 'axios';
import { handleError } from '../Helpers/ErrorHandler';
import { UserProfileToken } from '../Models/User';

const api = 'http://localhost:8000/api/v1/';

export const loginAPI = async (username: string, password: string, rememberMe: boolean) => {
  try {
    const data = await axios.post<UserProfileToken>(api + 'users/login', {
      username,
      password,
      rememberMe,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  avatar: File,
  agreeTermConditions: boolean,
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${api}users/register`,
      {
        firstName,
        lastName,
        username,
        email,
        password,
        avatar,
        agreeTermConditions,
      },
      {
        'Content-Type': 'multipart/form-data',
      },
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
