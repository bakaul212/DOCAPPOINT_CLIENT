import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDoctors = () => apiClient.get('/api/doctors');
export const getDoctorById = (id) => apiClient.get(`/api/doctors/${id}`);
export const getAppointments = () => apiClient.get('/api/appointments');
export const getUserAppointments = () => apiClient.get('/api/appointments/my-appointments');
export const createAppointment = (data) => apiClient.post('/api/appointments', data);
export const updateAppointment = (id, data) => apiClient.put(`/api/appointments/${id}`, data);
export const deleteAppointment = (id) => apiClient.delete(`/api/appointments/${id}`);
export const searchAppointments = (doctorName) => apiClient.get(`/api/appointments/search?doctorName=${doctorName}`);
export const updateUserProfile = (data) => apiClient.put('/api/users/profile', data);

export default apiClient;