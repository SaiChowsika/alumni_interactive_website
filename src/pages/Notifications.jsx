import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Notifications = () => {
  const { notifications, loading, error, markAsRead } = useNotifications();
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <div className="flex space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-600">Loading notifications...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-600">{error}</div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-600">
                {filter === 'all'
                  ? 'No notifications'
                  : filter === 'unread'
                  ? 'No unread notifications'
                  : 'No read notifications'}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        {!notification.read && (
                          <span className="inline-block text-xs text-blue-600">
                            New
                          </span>
                        )}
                        {notification.type && (
                          <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                            {notification.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications; 