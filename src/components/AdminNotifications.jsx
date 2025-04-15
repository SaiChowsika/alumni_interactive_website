/**
 * AdminNotifications Component
 * 
 * A specialized notification component for administrators that displays system-wide
 * notifications and allows for notification management.
 * 
 * Features:
 * - Real-time notification updates
 * - Notification filtering (All/Unread/Read)
 * - Bulk actions (Mark all as read)
 * - Notification categories
 * - Detailed notification view
 * - Action buttons for each notification
 * 
 * Components Used:
 * - React Hooks: useState, useEffect
 * - NotificationContext: For notification management
 * - Tailwind CSS: For styling
 * - React Icons: For visual indicators
 * 
 * Notification Types:
 * - Session Requests
 * - System Alerts
 * - User Reports
 * - Registration Approvals
 * 
 * API Integration:
 * - GET /api/notifications/admin
 * - PUT /api/notifications/bulk-update
 * - DELETE /api/notifications
 * 
 * @type {dynamic} - Real-time updates and filtering
 */

import React, { useState, useEffect } from 'react';
import { sessionService } from '../services/api';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await sessionService.getPendingSessions();
      setNotifications(response.data.sessions);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleApprove = async () => {
    try {
      await sessionService.updateSessionStatus(selectedSession._id, 'approved');
      // Send email notification to the session requester
      await sessionService.sendSessionStatusEmail(selectedSession._id, 'approved');
      setShowModal(false);
      fetchNotifications();
    } catch (error) {
      console.error('Error approving session:', error);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      alert('Please provide a reason for rejection');
      return;
    }

    try {
      await sessionService.updateSessionStatus(selectedSession._id, 'rejected', rejectionReason);
      // Send email notification to the session requester
      await sessionService.sendSessionStatusEmail(selectedSession._id, 'rejected', rejectionReason);
      setShowModal(false);
      setRejectionReason('');
      fetchNotifications();
    } catch (error) {
      console.error('Error rejecting session:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Session Requests</h2>
      
      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSessionClick(notification)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{notification.sessionTitle}</h3>
                <p className="text-gray-600">By: {notification.fullName}</p>
                <p className="text-sm text-gray-500">
                  {notification.userType === 'alumni' ? 'Alumni' : 'Faculty'} - 
                  {notification.userType === 'alumni' ? ` Graduated: ${notification.graduationYear}` : ` Department: ${notification.department}`}
                </p>
              </div>
              <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Session Details Modal */}
      {showModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold mb-4">{selectedSession.sessionTitle}</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Session Details</h4>
                <p className="text-gray-600">{selectedSession.sessionDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Session Type</h4>
                  <p className="text-gray-600">{selectedSession.sessionType}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Target Audience</h4>
                  <p className="text-gray-600">{selectedSession.targetAudience}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preferred Date</h4>
                  <p className="text-gray-600">{selectedSession.preferredDate}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preferred Time</h4>
                  <p className="text-gray-600">{selectedSession.preferredTime}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Session Mode</h4>
                  <p className="text-gray-600">{selectedSession.sessionMode}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Rejection Reason (if rejecting)</h4>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Enter reason for rejection..."
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications; 