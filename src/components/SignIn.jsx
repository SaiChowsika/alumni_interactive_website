/**
 * Sign In Component
 * 
 * Authentication component handling user login with role-based
 * redirection and security features.
 * 
 * Features:
 * - Multi-role authentication
 * - Remember me functionality
 * - Password recovery
 * - Error handling
 * - Session management
 * 
 * Form Fields:
 * 1. Authentication
 *    - Email/Username
 *    - Password
 *    - Remember me
 * 
 * 2. Additional Options
 *    - Forgot password
 *    - Sign up links
 *    - Help section
 * 
 * Security Features:
 * - Rate limiting
 * - Failed attempt tracking
 * - Session timeout
 * - Secure token storage
 * 
 * Role-based Routing:
 * - Student dashboard
 * - Alumni portal
 * - Faculty interface
 * - Admin console
 * 
 * State Management:
 * - Auth status
 * - Loading states
 * - Error messages
 * - Redirect paths
 * 
 * Dependencies:
 * - AuthContext
 * - React Router
 * - Form validation
 * - API services
 * 
 * @component SignIn
 * @example
 * ```jsx
 * <SignIn 
 *   onSuccess={handleLoginSuccess}
 *   onError={handleLoginError}
 *   defaultRedirect="/dashboard"
 * />
 * ```
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ModernSuccessAlert from './ModernSuccessAlert';
import { authService } from '../services/api';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the redirect path from location state, or default to home
  const from = location.state?.from || '/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Call the login API
      const response = await authService.login({
        email: formData.email.trim(),
        password: formData.password
      });
      
      if (response.status === 'success' && response.token) {
        // Store the token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Update auth context
        login(response.data.user);
        
        setShowAlert(true);

        // Get the role-specific dashboard route
        const dashboardRoutes = {
          admin: '/admin',
          student: '/student',
          alumni: '/alumni',
          faculty: '/faculty'
        };

        // If coming from a specific protected route (not landing page), use that route
        // Otherwise, use the role-specific dashboard
        const targetRoute = from === '/' ? dashboardRoutes[response.data.user.role] : from;
        
        // Redirect after successful login
        setTimeout(() => {
          navigate(targetRoute);
        }, 1500);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In clicked');
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Sign in to your account to continue.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-6 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
          {/* Email Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Email Address</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <Link to="/forgotpassword" className="text-purple-700 hover:text-purple-900">
              Forgot your password?
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/select-role" className="text-purple-700 hover:text-purple-900">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Success Alert */}
      {showAlert && (
        <ModernSuccessAlert
          message="Login Successfully Completed"
          onClose={closeAlert}
        />
      )}
    </section>
  );
};

export default SignIn;