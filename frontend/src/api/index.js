// frontend/src/api/index.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Get token from storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Add to headers
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Business Routes
export const fetchBusinesses = () => API.get('/business');
export const addBusiness = (data) => API.post('/business', data);

// Review Routes
export const submitReview = (data) => API.post('/review', data);
export const getPendingReviews = () => API.get('/review/pending');
export const approveReview = (id) => API.post(`/review/approve/${id}`);