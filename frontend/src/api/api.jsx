import axios from 'axios';

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Adjust as needed
});
console.log(baseURL)

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
