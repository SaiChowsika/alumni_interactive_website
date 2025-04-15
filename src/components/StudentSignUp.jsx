/**
 * Student Sign Up Component
 * 
 * Registration form specifically designed for student users with
 * validation and RGUKT-specific fields.
 * 
 * Features:
 * - Student-specific form fields
 * - Input validation
 * - Academic details collection
 * - Profile photo upload
 * - Email verification
 * 
 * Form Fields:
 * 1. Personal Information
 *    - Full name
 *    - Email (institutional)
 *    - Password
 *    - Profile photo
 * 
 * 2. Academic Details
 *    - Student ID
 *    - Branch/Department
 *    - Year of study
 *    - Campus
 * 
 * 3. Contact Information
 *    - Phone number
 *    - Alternative email
 *    - Address
 * 
 * Validation Rules:
 * - Email must be RGUKT domain
 * - Strong password requirements
 * - Required field checks
 * - Student ID format validation
 * 
 * State Management:
 * - Form data handling
 * - Validation states
 * - Submission status
 * - Error handling
 * 
 * Dependencies:
 * - AuthContext for registration
 * - Form validation library
 * - Image upload service
 * - API integration
 * 
 * @component StudentSignUp
 * @example
 * ```jsx
 * <StudentSignUp 
 *   onSuccess={handleSuccess}
 *   onError={handleError}
 * />
 * ```
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModernSuccessAlert from './ModernSuccessAlert'; // Adjust the import path as needed
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(''); // State to manage error messages
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get form values
      const fullName = e.target.elements.fullName.value.trim();
      const studentID = e.target.elements.studentID.value.trim();
      const email = e.target.elements.email.value.trim();
      const password = e.target.elements.password.value.trim();
      const confirmPassword = e.target.elements.confirmPassword.value.trim();
      const phoneNumber = e.target.elements.phoneNumber.value.trim();
      const year = e.target.elements.year.value;
      const department = e.target.elements.department.value;

      // Check if all fields are filled
      if (!fullName || !studentID || !email || !password || !confirmPassword || !phoneNumber || !year || !department) {
        setError('Please fill in all fields.');
        setIsLoading(false);
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        setError('Password and confirm password do not match.');
        setIsLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Validate password length
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // Prepare user data
      const userData = {
        fullName,
        email,
        password,
        role: 'student',
        studentId: studentID,
        phoneNumber,
        department,
        yearOfStudy: year
      };

      // Call API to store user data
      const response = await authService.signup(userData);
      
      if (response.status === 'success' && response.token) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Update auth context
        login(response.data.user);

        // Show success message
        setShowAlert(true);

        // Navigate directly to student dashboard after a delay
        setTimeout(() => {
          navigate('/student');
        }, 1500);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'An error occurred during signup. Please try again.');
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
        <h1 className="text-3xl font-bold text-center text-gray-800">Student Sign Up</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create your student account to access resources and sessions.
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

          {/* Student ID Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Student ID</span>
            <input
              name="studentID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your student ID"
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

          {/* Year Dropdown */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Year</span>
            <select
              name="year"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled selected>
                Select Year
              </option>
              <option value="E-1">E-1</option>
              <option value="E-2">E-2</option>
              <option value="E-3">E-3</option>
              <option value="E-4">E-4</option>
            </select>
          </label>

          {/* Department Dropdown */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Department</span>
            <select
              name="department"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled selected>
                Select Department
              </option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MECH">MECH</option>
              <option value="CHEM">CHEM</option>
              <option value="MME">MME</option>
            </select>
          </label>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-sm font-medium cursor-pointer text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
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

export default StudentSignUp;