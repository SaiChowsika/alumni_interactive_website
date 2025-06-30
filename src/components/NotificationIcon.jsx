import React, { useState, useRef, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";  // Fixed path: context not contexts
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const NotificationIcon = () => {
  const { notifications, removeNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-3.5-3.5a50.002 50.002 0 00-1.06-1.06L15 17zm-6-6h6m-3-3v6m-3 9h12a3 3 0 01-3-3V9a3 3 0 00-3-3H9a3 3 0 00-3 3v9a3 3 0 01-3 3z"
          />
        </svg>
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <Link
                to="/notifications"
                className="text-blue-600 text-sm hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View All
              </Link>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 truncate">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDistanceToNow(new Date(notification.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-500 ml-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {recentNotifications.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <Link
                to="/notifications"
                className="block text-center text-blue-600 text-sm hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View All Notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;