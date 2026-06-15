import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor to inject Authorization header
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('atma_mock_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to extract clean backend error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const data = error.response.data;
      // Extract from { message } or { data: { message } } or { data: null, message }
      const backendMessage = data.message || (data.data && data.data.message);
      if (backendMessage) {
        return Promise.reject(new Error(backendMessage));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
