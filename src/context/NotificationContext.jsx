import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Add this alias for backward compatibility
export const useNotifications = () => {
  return useNotification();
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to RGUKT Alumni Platform",
      message: "Your account has been successfully created. Start exploring!",
      type: "info",
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: "New Placement Opportunity",
      message: "A new job opening has been posted by TCS for Software Engineer role.",
      type: "info",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = {
      ...notification,
      id,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto remove after 5 seconds for toast notifications
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, 5000);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};