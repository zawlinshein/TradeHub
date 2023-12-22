import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.1.40.195:3000',
  timeout: 10000,
  timeoutErrorMessage: 'connection time out',
});

export default axiosInstance;
