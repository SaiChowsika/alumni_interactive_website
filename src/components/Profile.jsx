/**
 * Profile Component
 * 
 * Displays and manages user profile information with role-specific features
 * and dynamic content sections.
 * 
 * Features:
 * - Personal information display and editing
 * - Role-specific content (Student/Alumni/Faculty)
 * - Profile image management
 * - Session history and contributions
 * - Academic/Professional details
 * 
 * Props:
 * @param {Object} user - Current user object
 * @param {string} role - User role (student/alumni/faculty)
 * @param {Function} onUpdate - Profile update handler
 * @param {boolean} isEditable - Whether profile is in edit mode
 * 
 * State:
 * - editMode: Profile editing state
 * - loading: Data loading state
 * - error: Error message state
 * - formData: Form field values
 * 
 * Sections:
 * 1. Profile Header
 *    - Profile image
 *    - Basic information
 *    - Edit controls
 * 
 * 2. Personal Details
 *    - Contact information
 *    - Biography
 *    - Social links
 * 
 * 3. Role-Specific Content
 *    - Student: Academic details, placements
 *    - Alumni: Professional experience
 *    - Faculty: Department, expertise
 * 
 * 4. Session Information
 *    - Conducted sessions
 *    - Attended sessions
 *    - Upcoming sessions
 * 
 * Dependencies:
 * - AuthContext for user data
 * - API services for data fetching
 * - Image upload utilities
 * 
 * @component Profile
 * @example
 * ```jsx
 * <Profile 
 *   user={currentUser}
 *   role="student"
 *   onUpdate={handleUpdate}
 *   isEditable={true}
 * />
 * ```
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TermsAndConditions from './TermsAndConditions';
import axios from 'axios';

const Profile = ({ profileData, overviewFields, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(profileData || {});
  const [isPhotoEditing, setIsPhotoEditing] = useState(false);
  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();
  const [sessionContributions, setSessionContributions] = useState({
    requested: [],
    conducted: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update data when profileData changes
  useEffect(() => {
    if (profileData) {
      setData(profileData);
    }
  }, [profileData]);

  // Fetch session contributions for alumni and faculty
  useEffect(() => {
    if (user?.role === 'alumni' || user?.role === 'faculty') {
      const fetchSessionContributions = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/sessions/user/${user._id}`);
          setSessionContributions({
            requested: response.data.requestedSessions || [],
            conducted: response.data.conductedSessions || []
          });
        } catch (error) {
          console.error('Error fetching session contributions:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSessionContributions();
    }
  }, [user?.role, user?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileImage = reader.result;
        setData(prevData => ({
          ...prevData,
          profileImage: newProfileImage
        }));
        if (user) {
          const updatedUser = { ...user, profilePhoto: newProfileImage };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    setIsPhotoEditing(false);
    if (onSave) {
      await onSave(data);
    }
  };

  // Default overview fields if none provided
  const defaultOverviewFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' }
  ];

  const fieldsToUse = overviewFields || defaultOverviewFields;

  return (
    <div className="p-6 flex-grow">
      {/* Profile Cover Section */}
      <div
        className="relative bg-cover bg-center h-45 rounded-lg shadow-md"
        style={{
          backgroundImage: 'url(assets/images/background/profile-cover.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 rounded-lg h-25"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-center space-x-4">
          <div className="relative">
            <img
              src={data.profileImage || '/src/assets/profile1.jpg'}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-scale-up"
              alt="Profile"
              style={{ transform: 'translateY(18%)' }}
            />
            {isPhotoEditing && (
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            )}
            <button
              onClick={() => {
                setIsPhotoEditing(true);
                fileInputRef.current?.click();
              }}
              className="absolute bottom-0 right-0 bg-blue-600 text-gray-800 rounded-full p-2 hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="" style={{ transform: 'translateY(40%)' }}>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="fullName"
                  value={data.fullName || ''}
                  onChange={handleInputChange}
                  className="text-2xl font-semibold bg-transparent border-b border-white text-gray-800 focus:outline-none"
                />
                <input
                  type="text"
                  name="username"
                  value={data.username || ''}
                  onChange={handleInputChange}
                  className="text-gray-800 bg-transparent border-b border-white focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold">{data.fullName || 'User'}</h2>
                <p className="text-gray-800">@{data.username || 'username'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Overview Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Profile Overview</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldsToUse.map((field) => (
            <div key={field.name}>
              <h5 className="text-sm font-semibold text-gray-800 uppercase">{field.label}</h5>
              {isEditing ? (
                field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={data[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={data[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                )
              ) : (
                <p className="text-gray-600">{data[field.name] || 'Not specified'}</p>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Session Contributions Section for Alumni and Faculty */}
      {(user?.role === 'alumni' || user?.role === 'faculty') && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Session Contributions</h3>
          
          {isLoading ? (
            <div className="text-center py-4">Loading session data...</div>
          ) : (
            <>
              {/* Requested Sessions */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Requested Sessions</h4>
                  <button
                    onClick={() => document.getElementById('requestedSessions').classList.toggle('hidden')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Toggle
                  </button>
                </div>
                <div id="requestedSessions" className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionContributions.requested.length > 0 ? (
                        sessionContributions.requested.map((session) => (
                          <tr key={session._id} className="border-b">
                            <td className="px-4 py-2">{session.title}</td>
                            <td className="px-4 py-2">{new Date(session.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                session.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                session.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {session.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-gray-500">
                            No requested sessions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Conducted Sessions */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Conducted Sessions</h4>
                  <button
                    onClick={() => document.getElementById('conductedSessions').classList.toggle('hidden')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Toggle
                  </button>
                </div>
                <div id="conductedSessions" className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Attendees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionContributions.conducted.length > 0 ? (
                        sessionContributions.conducted.map((session) => (
                          <tr key={session._id} className="border-b">
                            <td className="px-4 py-2">{session.title}</td>
                            <td className="px-4 py-2">{new Date(session.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{session.attendees}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-gray-500">
                            No conducted sessions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Terms and Conditions Form for E3/E4 Students */}
      {user?.role === 'student' && ['E-3', 'E-4'].includes(user?.yearOfStudy) && (
        <div className="mt-8">
          <TermsAndConditions />
        </div>
      )}
    </div>
  );
};

export default Profile;