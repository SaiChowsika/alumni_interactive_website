import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModernSuccessAlert from './ModernSuccessAlert'; // Adjust the import path as necessary
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { validateAdminData } from '../services/validationService';

const AdminSignUp = () => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State to manage success alert visibility
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // State to manage form errors
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get form values
      const fullName = e.target.elements.fullName.value.trim();
      const designation = e.target.elements.designation.value.trim();
      const email = e.target.elements.email.value.trim();
      const password = e.target.elements.password.value.trim();
      const confirmPassword = e.target.elements.confirmPassword.value.trim();
      const phone = e.target.elements.phone.value.trim();

      // Check if all fields are filled
      if (!fullName || !designation || !email || !password || !confirmPassword || !phone) {
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

      // Validate admin email against dummy data
      const validation = await validateAdminData(email);
      if (!validation.isValid) {
        setError(validation.error);
        setIsLoading(false);
        return;
      }

      // Prepare user data
      const userData = {
        fullName,
        email,
        password,
        role: 'admin',
        designation,
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

      // Navigate directly to admin dashboard after a delay
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  // Close success alert
  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        {/* Welcome Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Sign Up</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create your admin account to manage the platform.
        </p>

        {/* Sign Up Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Full Name</span>
            <input
              name="fullName" // Added name attribute
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </label>

          {/* Designation Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Designation</span>
            <input
              name="designation" // Added name attribute
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your designation"
              required
            />
          </label>

          {/* Email Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Email Address</span>
            <input
              name="email" // Added name attribute
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
                name="password" // Added name attribute
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
                name="confirmPassword" // Added name attribute
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
              name="phone" // Added name attribute
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
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <ModernSuccessAlert
          message="Your account has been successfully created!"
          onClose={closeSuccessAlert}
        />
      )}
    </section>
  );
};

export default AdminSignUp;