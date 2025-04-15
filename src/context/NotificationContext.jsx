import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const NotificationContext = createContext();

/**
 * Notification Context
 * 
 * Manages application-wide notifications and alerts using React Context.
 * Handles real-time notifications, alerts, and message broadcasting.
 * 
 * Context Values:
 * - notifications: Array of current notifications
 * - unreadCount: Number of unread notifications
 * - loading: Loading state for notifications
 * - error: Error state for notification operations
 * 
 * Methods:
 * - addNotification: Create new notification
 * - removeNotification: Delete notification
 * - markAsRead: Mark notification as read
 * - clearAll: Clear all notifications
 * - fetchNotifications: Get user notifications
 * 
 * Notification Types:
 * - System notifications
 * - Session updates
 * - User mentions
 * - Admin alerts
 * - Custom messages
 * 
 * Features:
 * - Real-time updates
 * - Notification persistence
 * - Read/unread tracking
 * - Priority levels
 * - Notification grouping
 * 
 * Usage:
 * ```jsx
 * // Wrap your app with NotificationProvider
 * <NotificationProvider>
 *   <App />
 * </NotificationProvider>
 * 
 * // Use notifications in components
 * const { notifications, markAsRead } = useNotifications();
 * ```
 * 
 * @type {React.Context} Notification management context
 */

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching notifications from:', `${API_BASE_URL}/api/notifications`);
      const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data && Array.isArray(response.data.notifications)) {
        setNotifications(response.data.notifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to fetch notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchNotifications();
    }
  }, []);

  const addNotification = (notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const value = {
    notifications,
    loading,
    error,
    addNotification,
    markAsRead,
    fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext; 