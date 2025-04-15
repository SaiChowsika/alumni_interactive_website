/**
 * Alumni Sign Up Component
 * 
 * Registration form for RGUKT alumni with professional and academic
 * background collection.
 * 
 * Features:
 * - Alumni-specific form fields
 * - Professional details
 * - Academic history
 * - Verification process
 * - Profile setup
 * 
 * Form Fields:
 * 1. Personal Information
 *    - Full name
 *    - Email
 *    - Password
 *    - Profile photo
 * 
 * 2. Academic Background
 *    - Graduation year
 *    - Branch/Department
 *    - Campus
 *    - Roll number
 * 
 * 3. Professional Details
 *    - Current company
 *    - Designation
 *    - Industry
 *    - Experience
 * 
 * 4. Contact Information
 *    - Phone number
 *    - LinkedIn profile
 *    - Current location
 * 
 * Validation:
 * - Email format
 * - Password strength
 * - Required fields
 * - Graduation year range
 * 
 * State Management:
 * - Form data
 * - Validation states
 * - Upload progress
 * - Submission status
 * 
 * Dependencies:
 * - AuthContext
 * - Form validation
 * - File upload
 * - API services
 * 
 * @component AlumniSignUp
 * @example
 * ```jsx
 * <AlumniSignUp 
 *   onRegister={handleRegistration}
 *   onVerification={handleVerification}
 * />
 * ```
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModernSuccessAlert from './ModernSuccessAlert'; 
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AlumniSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(''); // State to manage error messages
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [graduationYear, setGraduationYear] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2013 }, (_, i) => 2014 + i);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get form values
      const fullName = e.target.elements.fullName.value.trim();
      const collegeID = e.target.elements.collegeID.value.trim();
      const email = e.target.elements.email.value.trim();
      const password = e.target.elements.password.value.trim();
      const confirmPassword = e.target.elements.confirmPassword.value.trim();
      const phoneNumber = e.target.elements.phoneNumber.value.trim();

      // Check if all fields are filled
      if (!fullName || !collegeID || !email || !password || !confirmPassword || !phoneNumber || !graduationYear) {
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
        role: 'alumni',
        collegeId: collegeID,
        phoneNumber,
        graduationYear
      };

      // Call API to store user data
      const response = await signup(userData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Update auth context
      login(response.data.user);

      // Show success message
      setShowAlert(true);

      // Navigate directly to alumni dashboard after a delay
      setTimeout(() => {
        navigate('/alumni');
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        {/* Welcome Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Alumni Sign Up</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create your alumni account to stay connected with the community.
        </p>

        {/* Sign Up Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
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

          {/* College ID Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">College ID</span>
            <input
              name="collegeID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your college ID"
              required
            />
          </label>

          {/* Year of Graduation Input */}
          <div>
            <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700">
              Year of Graduation
            </label>
            <select
              id="graduation_year"
              name="graduation_year"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

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

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Phone Number Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Phone Number</span>
            <input
              name="phoneNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </label>

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

        {/* Terms and Privacy Policy */}
        <p className="mt-6 text-xs text-center text-gray-600">
          By signing up, you agree to our{' '}
          <a href="#" className="text-purple-700 hover:text-purple-900">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-700 hover:text-purple-900">
            Privacy Policy
          </a>
          .
        </p>

        {/* Success Alert */}
        {showAlert && (
          <ModernSuccessAlert
            message="Your account has been successfully created!"
            onClose={closeAlert}
          />
        )}
      </div>
    </section>
  );
};

export default AlumniSignUp;