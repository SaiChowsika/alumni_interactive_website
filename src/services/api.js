import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Session services
export const sessionService = {
  getAllSessions: async () => {
    try {
      const response = await api.get('/sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return { status: 'error', message: 'Failed to fetch sessions', data: [] };
    }
  },

  createSession: async (sessionData) => {
    try {
      const response = await api.post('/sessions', sessionData);
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  updateSession: async (id, sessionData) => {
    try {
      const response = await api.put(`/sessions/${id}`, sessionData);
      return response.data;
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  },

  deleteSession: async (id) => {
    try {
      const response = await api.delete(`/sessions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  },

  joinSession: async (sessionId) => {
    try {
      const response = await api.post(`/sessions/${sessionId}/join`);
      return response.data;
    } catch (error) {
      console.error('Error joining session:', error);
      throw error;
    }
  }
};

// User services
export const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: 'error', message: 'Failed to fetch users', data: [] };
    }
  },

  getUserProfile: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateUserProfile: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  searchUsers: async (query) => {
    try {
      const response = await api.get(`/users/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      return { status: 'error', data: [] };
    }
  }
};

// Statistics services
export const statisticsService = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/statistics/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return { 
        status: 'error', 
        data: {
          totalUsers: 0,
          totalSessions: 0,
          activeSessions: 0,
          totalAlumni: 0
        }
      };
    }
  }
};

// Add this to your existing api.js file, before export default api;

// Submission services
export const submissionService = {
  getAllSubmissions: async () => {
    try {
      const response = await api.get('/submissions');
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  },

  createSubmission: async (submissionData) => {
    try {
      const response = await api.post('/submissions', submissionData);
      return response.data;
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    }
  },

  updateSubmission: async (id, submissionData) => {
    try {
      const response = await api.put(`/submissions/${id}`, submissionData);
      return response.data;
    } catch (error) {
      console.error('Error updating submission:', error);
      throw error;
    }
  },

  deleteSubmission: async (id) => {
    try {
      const response = await api.delete(`/submissions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  }
};

export default api;