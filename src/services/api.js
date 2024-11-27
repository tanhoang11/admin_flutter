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
// API Services
export const getTrips = async () => {
  const response = await api.get("/trips");
  return response.data;
};

export const getTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const addTrip = async (tripData) => {
  const response = await api.post("/trips", tripData);
  return response.data;
};

export const updateTrip = async (id, tripData) => {
  const response = await api.put(`/trips/${id}`, tripData);
  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};

export default api;