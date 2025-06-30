import axios from 'axios';

// Create axios instance with correct base URL
const api = axios.create({
  baseURL: '/api', // Single /api, not /api/api
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  getCurrentUser: () => api.get('/auth/me'),
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout')
};

// Session service - ADD THIS
export const sessionService = {
  getSessions: () => api.get('/sessions'),
  createSession: (data) => api.post('/sessions', data),
  getSessionById: (id) => api.get(`/sessions/${id}`),
  updateSession: (id, data) => api.put(`/sessions/${id}`, data),
  deleteSession: (id) => api.delete(`/sessions/${id}`),
  joinSession: (id) => api.post(`/sessions/${id}/join`),
  leaveSession: (id) => api.post(`/sessions/${id}/leave`)
};

// Submission service
export const submissionService = {
  getSubmissions: (userId) => api.get(`/placements/user/${userId || ''}`),
  createSubmission: (data) => api.post('/placements', data),
  getSubmissionById: (id) => api.get(`/placements/${id}`),
  updateSubmission: (id, data) => api.put(`/placements/${id}`, data),
  deleteSubmission: (id) => api.delete(`/placements/${id}`)
};

export default api;