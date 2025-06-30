import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";  // Fixed path: context not contexts
import { formatDistanceToNow } from "date-fns";
import Header from "../components/Header";

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('info')}
                className={`px-4 py-2 rounded ${filter === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Info
              </button>
              <button
                onClick={() => setFilter('warning')}
                className={`px-4 py-2 rounded ${filter === 'warning' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Warnings
              </button>
            </div>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No notifications found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;