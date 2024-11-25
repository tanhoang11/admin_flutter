import axios from 'axios';

const API_BASE_URL = 'https://gki-flutter.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Thêm token nếu cần (sau khi login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  return api.post('/users/login', credentials);
};

export const getTrips = async () => {
    try {
      const response = await api.get('/trips');
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      console.error('Error fetching trips', error);
      throw error;
    }
  };

export default api;
