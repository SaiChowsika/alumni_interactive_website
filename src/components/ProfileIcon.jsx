import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  // Get the profile link based on user role
  const getProfileLink = () => {
    const profileLinks = {
      admin: '/adminprofile',
      student: '/studentprofile',
      alumni: '/alumniprofile',
      faculty: '/facultyprofile'
    };
    return profileLinks[user?.role] || '#';
  };

  return (
    <div className="relative" ref={profileDropdownRef}>
      <button
        className="p-0 rounded-full btn btn-white cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="avatar avatar-sm">
          <img
            src={'/src/assets/profile1.jpg' ||user?.profilePhoto }
            alt="Profile"
            className="rounded-full w-5 h-5"
            style={{ width: '30px', height: '30px' }}
          />
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-42 bg-slate-800 rounded-md shadow-lg z-50">
          <Link
            to={getProfileLink()}
            className="block px-4 py-2 text-sm text-white hover:bg-slate-600 hover:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="inline-block w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Profile
          </Link>
          <Link
            to="/changepassword"
            className="block px-4 py-2 text-sm text-white hover:bg-slate-600 hover:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="inline-block w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            Change password
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-600 hover:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="inline-block w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;