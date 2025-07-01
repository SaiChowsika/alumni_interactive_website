import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error);
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

// Session service - ADD THIS
export const sessionService = {
  getAllSessions: () => api.get('/sessions'),
  getSessions: () => api.get('/sessions'), 
  createSession: (data) => api.post('/sessions', data),
  getSessionById: (id) => api.get(`/sessions/${id}`),
  updateSession: (id, data) => api.put(`/sessions/${id}`, data),
  updateSessionStatus: (id, status) => api.put(`/sessions/${id}/status`, { status }),
  deleteSession: (id) => api.delete(`/sessions/${id}`),
  joinSession: (id) => api.post(`/sessions/${id}/join`),
  leaveSession: (id) => api.post(`/sessions/${id}/leave`)
};

// Submission service
export const submissionService = {
  getSubmissions: () => api.get('/submissions'),
  createSubmission: (data) => api.post('/submissions', data),
  getSubmissions: () => {
    console.log('Fetching submissions...');
    return api.get('/submissions');
  },
  
  createSubmission: (data) => {
    console.log('Creating submission with data:', data);
    return api.post('/submissions', data);
  },
  
  getSubmissionById: (id) => api.get(`/submissions/${id}`),
  updateSubmission: (id, data) => api.put(`/submissions/${id}`, data),
  deleteSubmission: (id) => api.delete(`/submissions/${id}`)
};

// Placement service (if you're using it)
export const placementService = {
  getPlacements: () => api.get('/placements'),
  createPlacement: (data) => api.post('/placements', data),
  getPlacementById: (id) => api.get(`/placements/${id}`),
  updatePlacement: (id, data) => api.put(`/placements/${id}`, data),
  deletePlacement: (id) => api.delete(`/placements/${id}`)
};

export default api;