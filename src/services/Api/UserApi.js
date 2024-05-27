import axiosClient from "../../api/axios";

const UserApi = {
  login: async (email, password) => {
    return await axiosClient.post('/api/login', { email, password });
  },
  logout: async () => {
    return await axiosClient.post('/api/logout');
  },
  getUserInfo: async () => {
    return await axiosClient.get('/api/auth/user');
  },
  getAdminInfo: async () => {
    return await axiosClient.get('/api/auth/admin');
  },
};

export default UserApi;
