import axios from 'axios';

// Create an Axios instance with default settings
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Include credentials
});

export default axiosClient;
