import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});
