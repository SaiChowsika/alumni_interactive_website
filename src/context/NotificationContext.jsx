import React, { createContext, useContext, useState, useEffect } from 'react';
import { notificationService } from '../services/api';

const NotificationContext = createContext();

// Export the hook directly from this file
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching notifications...');
      
      const response = await notificationService.getNotifications();
      
      if (response.status === 'success') {
        setNotifications(response.data || []);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.message || 'Failed to fetch notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new notification
  const addNotification = async (notificationData) => {
    try {
      setError(null);
      const response = await notificationService.createNotification(notificationData);
      
      if (response.status === 'success') {
        setNotifications(prev => [response.data, ...prev]);
        return response.data;
      }
    } catch (error) {
      console.error('Error adding notification:', error);
      setError(error.message || 'Failed to add notification');
      throw error;
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      setError(null);
      await notificationService.markAsRead(notificationId);
      
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError(error.message || 'Failed to mark notification as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setError(null);
      await notificationService.markAllAsRead();
      
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setError(error.message || 'Failed to mark all notifications as read');
    }
  };

  // Delete a notification
  const deleteNotification = async (notificationId) => {
    try {
      setError(null);
      await notificationService.deleteNotification(notificationId);
      
      setNotifications(prev =>
        prev.filter(notification => notification._id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError(error.message || 'Failed to delete notification');
    }
  };

  // Add a local notification (for immediate feedback)
  const addLocalNotification = (notification) => {
    const newNotification = {
      _id: Date.now().toString(),
      title: notification.title,
      message: notification.message,
      type: notification.type || 'info',
      read: false,
      createdAt: new Date().toISOString(),
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);

    // Auto remove after 5 seconds if it's a temporary notification
    if (notification.temporary) {
      setTimeout(() => {
        setNotifications(prev =>
          prev.filter(n => n._id !== newNotification._id)
        );
      }, 5000);
    }
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setError(null);
  };

  // Refresh notifications
  const refreshNotifications = () => {
    fetchNotifications();
  };

  // Load notifications on mount (commented out to avoid 404 errors during development)
  useEffect(() => {
    // Only fetch if user is logged in and we have a token
    const token = localStorage.getItem('token');
    if (token) {
      // fetchNotifications(); // Uncomment when backend notification routes are ready
    }
  }, []);

  const contextValue = {
    // State
    notifications,
    loading,
    error,
    
    // Actions
    fetchNotifications,
    addNotification,
    addLocalNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    refreshNotifications,
    
    // Computed values
    unreadCount: getUnreadCount(),
    hasUnread: getUnreadCount() > 0
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;