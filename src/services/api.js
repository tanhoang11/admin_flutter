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
// lấy danh sách sản phẩm
export const getTrips = async () => {
    try {
      const response = await api.get('/trips');
      return response.data;
    } catch (error) {
      console.error('Error fetching trips', error);
      throw error;
    }
  };
  

// Lấy thông tin trip theo ID
export const getTripById = async (id) => {
  try {
    const response = await api.get(`/trips/${id}`);
    return response.data; // Đảm bảo API trả về dữ liệu đúng định dạng
  } catch (error) {
    console.error("Error fetching trip by ID:", error);
    throw error;
  }
};

// Thêm sản phẩm
export const addTrip = async (tripData) => {
    try {
      const response = await api.post('/trips', tripData);
      return response.data;
    } catch (error) {
      console.error('Error adding trip', error);
      throw error;
    }
  };
  

// Cập nhật sản phẩm
export const updateTrip = async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, tripData);
      return response.data;
    } catch (error) {
      console.error('Error updating trip', error);
      throw error;
    }
  };
  

// Xóa sản phẩm
export const deleteTrip = async (id) => {
    try {
      await api.delete(`/trips/${id}`);
    } catch (error) {
      console.error('Error deleting trip', error);
      throw error;
    }
  };
  

export default api;
