import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // TODO: Replace with actual API call
        // Mock data for now
        const mockNotifications = [
          {
            id: 1,
            title: 'Session Request Status',
            message: 'Your session request has been accepted',
            type: 'session',
            status: 'unread',
            date: '2024-04-10'
          },
          {
            id: 2,
            title: 'Terms & Conditions Update',
            message: 'Your placement form has been reviewed',
            type: 'terms',
            status: 'read',
            date: '2024-04-09'
          }
        ];
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => n.status === 'unread').length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      // TODO: Implement API call to mark notification as read
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, status: 'read' }
          : notification
      ));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.status === 'unread' ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                    </div>
                    {notification.status === 'unread' && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {recentNotifications.length === 0 && (
                <p className="text-gray-500 text-center py-2">No notifications</p>
              )}

              <div className="text-center">
                <a
                  href="/notifications"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All Notifications
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 