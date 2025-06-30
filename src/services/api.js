import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  getCurrentUser: async () => {
    return await apiClient.get('/auth/me');
  },
  
  signup: async (userData) => {
    return await apiClient.post('/auth/signup-simple', userData);
  },
  
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
  },
  
  logout: async () => {
    return await apiClient.post('/auth/logout');
  },
  
  forgotPassword: async (email) => {
    return await apiClient.post('/auth/forgot-password', { email });
  },
  
  changePassword: async (passwordData) => {
    return await apiClient.post('/auth/change-password', passwordData);
  },
  
  checkEligibility: async (data) => {
    return await apiClient.post('/auth/check-eligibility', data);
  }
};

// Session Service
export const sessionService = {
  getSessions: async () => {
    return await apiClient.get('/sessions');
  },
  
  createSession: async (sessionData) => {
    return await apiClient.post('/sessions', sessionData);
  },
  
  getSessionById: async (id) => {
    return await apiClient.get(`/sessions/${id}`);
  },
  
  updateSession: async (id, sessionData) => {
    return await apiClient.put(`/sessions/${id}`, sessionData);
  },
  
  deleteSession: async (id) => {
    return await apiClient.delete(`/sessions/${id}`);
  },
  
  joinSession: async (id) => {
    return await apiClient.post(`/sessions/${id}/join`);
  },
  
  leaveSession: async (id) => {
    return await apiClient.post(`/sessions/${id}/leave`);
  }
};

// Submission Service
export const submissionService = {
  getSubmissions: async () => {
    return await apiClient.get('/submissions');
  },
  
  createSubmission: async (submissionData) => {
    return await apiClient.post('/submissions', submissionData);
  },
  
  getSubmissionById: async (id) => {
    return await apiClient.get(`/submissions/${id}`);
  },
  
  updateSubmission: async (id, submissionData) => {
    return await apiClient.put(`/submissions/${id}`, submissionData);
  },
  
  deleteSubmission: async (id) => {
    return await apiClient.delete(`/submissions/${id}`);
  }
};

// Placements Service
export const placementService = {
  getPlacements: async () => {
    return await apiClient.get('/placements');
  },
  
  createPlacement: async (placementData) => {
    return await apiClient.post('/placements', placementData);
  },
  
  getPlacementById: async (id) => {
    return await apiClient.get(`/placements/${id}`);
  },
  
  updatePlacement: async (id, placementData) => {
    return await apiClient.put(`/placements/${id}`, placementData);
  },
  
  deletePlacement: async (id) => {
    return await apiClient.delete(`/placements/${id}`);
  },
  
  getUserPlacements: async (userId) => {
    return await apiClient.get(`/placements/user/${userId}`);
  }
};

// Notification Service
export const notificationService = {
  getNotifications: async () => {
    return await apiClient.get('/notifications');
  },
  
  createNotification: async (notificationData) => {
    return await apiClient.post('/notifications', notificationData);
  },
  
  getNotificationById: async (id) => {
    return await apiClient.get(`/notifications/${id}`);
  },
  
  markAsRead: async (id) => {
    return await apiClient.put(`/notifications/${id}/read`);
  },
  
  markAllAsRead: async () => {
    return await apiClient.put('/notifications/read-all');
  },
  
  deleteNotification: async (id) => {
    return await apiClient.delete(`/notifications/${id}`);
  }
};

// Export default axios instance for custom requests
export default apiClient;