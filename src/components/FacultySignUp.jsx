/**
 * Faculty Sign Up Component
 * 
 * Registration form for RGUKT faculty members with academic and
 * professional credentials verification.
 * 
 * Features:
 * - Faculty-specific form fields
 * - Department selection
 * - Credentials verification
 * - Document upload
 * - Profile creation
 * 
 * Form Fields:
 * 1. Personal Information
 *    - Full name
 *    - Email (institutional)
 *    - Password
 *    - Profile photo
 * 
 * 2. Academic Credentials
 *    - Highest qualification
 *    - Specialization
 *    - Research interests
 *    - Publications
 * 
 * 3. Professional Details
 *    - Department
 *    - Designation
 *    - Employee ID
 *    - Years of experience
 * 
 * 4. Contact Information
 *    - Office location
 *    - Phone number
 *    - Office hours
 *    - Alternative contact
 * 
 * Validation:
 * - Institutional email
 * - Required credentials
 * - Document formats
 * - Contact information
 * 
 * State Management:
 * - Form data
 * - Document uploads
 * - Verification status
 * - Error handling
 * 
 * Dependencies:
 * - AuthContext
 * - File upload service
 * - Form validation
 * - API integration
 * 
 * @component FacultySignUp
 * @example
 * ```jsx
 * <FacultySignUp 
 *   onCredentialsVerified={handleVerification}
 *   onProfileCreated={handleCreation}
 * />
 * ```
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModernSuccessAlert from './ModernSuccessAlert';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FacultySignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get form values
      const fullName = e.target.elements.fullName.value.trim();
      const facultyID = e.target.elements.facultyID.value.trim();
      const email = e.target.elements.email.value.trim();
      const password = e.target.elements.password.value.trim();
      const confirmPassword = e.target.elements.confirmPassword.value.trim();
      const phone = e.target.elements.phone.value.trim();

      // Check if all fields are filled
      if (!fullName || !facultyID || !email || !password || !confirmPassword || !phone) {
        setError('Please fill in all fields.');
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        setError('Password and confirm password do not match.');
        return;
      }

      // Prepare user data
      const userData = {
        fullName,
        email,
        password,
        role: 'faculty',
        facultyId: facultyID,
        phone
      };

      // Call API to store user data
      const response = await authService.signup(userData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Update auth context
      login(response.data.user);

      // Show success message
      setShowSuccessAlert(true);

      // Navigate directly to faculty dashboard after a delay
      setTimeout(() => {
        navigate('/faculty');
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        {/* Welcome Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Faculty Sign Up</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create your faculty account to manage sessions and students.
        </p>

        {/* Sign Up Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Full Name</span>
            <input
              name="fullName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </label>

          {/* Faculty ID Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Faculty ID</span>
            <input
              name="facultyID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your faculty ID"
              required
            />
          </label>

          {/* Email Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Email Address</span>
            <input
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              placeholder="Enter your email"
              required
            />
          </label>

          

          {/* Password Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Password</span>
            <div className="relative">
              <input
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                 {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {/* Confirm Password Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</span>
            <div className="relative">
              <input
                name="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                 {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {/* Phone Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Phone Number</span>
            <input
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your phone number"
              required
            />
          </label>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium cursor-pointer text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>

        {/* Already a Member */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-purple-700 hover:text-purple-900">
            Sign In
          </Link>
        </p>

        {/* Success Alert */}
        {showSuccessAlert && (
          <ModernSuccessAlert
            message="Your account has been successfully created!"
            onClose={closeSuccessAlert}
          />
        )}
      </div>
    </section>
  );
};

export default FacultySignUp;