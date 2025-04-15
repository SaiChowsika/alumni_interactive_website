/**
 * MainNavbar Component
 * 
 * The primary navigation component for authenticated users, providing access to
 * various sections of the application based on user role.
 * 
 * Features:
 * - Responsive design with mobile menu
 * - Dynamic navigation links based on user role
 * - Notification integration
 * - Profile dropdown menu
 * - Active link highlighting
 * - Logout functionality
 * 
 * Components Used:
 * - React Hooks: useState, useEffect
 * - React Router: For navigation and active link detection
 * - NotificationIcon: For displaying notifications
 * - ProfileIcon: For user profile menu
 * - AuthContext: For user role and authentication state
 * 
 * Navigation Structure:
 * - Home
 * - Sessions (conditional based on role)
 * - Statistics (admin only)
 * - Profile
 * - Notifications
 * 
 * @type {dynamic} - Adapts to user role and authentication state
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationIcon from './NotificationIcon'; // Import NotificationIcon
import ProfileIcon from './ProfileIcon'; // Import ProfileIcon
import { useNavigation } from '../context/NavigationContext';

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ref for mobile menu
  const mobileMenuRef = useRef(null);

  const navigate = useNavigate();

  const { getHomePath, canAccessRoute, requiresAuth, isAuthenticated } = useNavigation();

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    if (requiresAuth(path) && !isAuthenticated) {
      navigate('/signin', { state: { from: path } });
    } else {
      navigate(path);
    }
    closeMobileMenu();
  };

  // Navigation items with permission checks
  const navigationItems = [
    { path: getHomePath(), label: 'Home', alwaysShow: true },
    { path: '/departments', label: 'Departments', show: canAccessRoute('/departments') },
    { path: '/sessions', label: 'Sessions', show: true }, // Always show Sessions, but handle auth in click
    { path: '/placements', label: 'Placements', show: canAccessRoute('/placements') },
    { path: '/aboutus', label: 'About Us', show: canAccessRoute('/aboutus') }
  ];

  return (
    <div>
      {/* Main Navbar */}
      <header className="sticky top-0 z-30 w-full px-1 py-1 bg-cyan-700 border border-gray-200 sm:px-4 mt-0.5">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-white cursor-pointer hover:text-primary focus:outline-none"
              aria-label="toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:justify-center md:flex-1">
            <div className="flex space-x-18">
              {navigationItems.map((item, index) => (
                (item.alwaysShow || item.show) && (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className="text-white hover:text-black cursor-pointer bg-transparent border-none"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Notification and Profile Icons */}
          <div className="flex items-center space-x-3">
            <NotificationIcon />
            <ProfileIcon />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out  bg-gray-800 md:hidden ${
            isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
          }`}
          ref={mobileMenuRef}
        >
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item, index) => (
              (item.alwaysShow || item.show) && (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="text-white hover:text-primary hover:text-blue-600 cursor-pointer text-left bg-transparent border-none"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainNavbar;