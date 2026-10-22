import { useStore } from '@/store/store';
import { CustomError } from '@/types/custom-error.type';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.request.use(
  (config) => {
    const accessToken = useStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async   (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const data = error.response?.data;
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : error.message;
    const errorCode =
      typeof data === 'object' &&
      data !== null &&
      'errorCode' in data &&
      typeof data.errorCode === 'string'
        ? data.errorCode
        : 'UNKNOWN_ERROR';
    const customError: CustomError = Object.assign(new Error(message), { errorCode });

    return Promise.reject(customError);
  }
);

export default API;
