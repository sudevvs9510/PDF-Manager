import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'http://localhost:4000', // Adjust as needed
});

// Add a request interceptor to include the token
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default authAxios;
