import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get form values
      const formData = new FormData(e.target);
      const userData = {
        fullName: formData.get('fullName').trim(),
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
        confirmPassword: formData.get('confirmPassword').trim(),
        role: 'student',
        studentId: formData.get('studentID').trim(),
        phoneNumber: formData.get('phoneNumber').trim(),
        department: formData.get('department'),
        yearOfStudy: formData.get('year')
      };

      // Validation
      if (!userData.fullName || !userData.email || !userData.password || !userData.studentId || !userData.department || !userData.yearOfStudy) {
        setError('Please fill in all required fields.');
        return;
      }

      if (userData.password !== userData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      if (userData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Remove confirmPassword before sending to API
      delete userData.confirmPassword;

      console.log('Submitting student data:', userData);

      // Call API
      const response = await authService.signup(userData);

      if (response.status === 'success' && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        login(response.data.user);
        setShowAlert(true);
        
        setTimeout(() => {
          navigate('/student');
        }, 1500);
      }

    } catch (err) {
      console.error('Signup error:', err);
      console.error('Response data:', error.response?.data);
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

        {/* Success Alert */}
        {showAlert && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Registration successful! Redirecting to dashboard...
          </div>
        )}

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
                {showPassword ? '👁️' : '🙈'}
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
                {showConfirmPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </label>

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

          {/* Department Dropdown */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Department</span>
            <select
              name="department"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled selected>Select your department</option>
              <option value="CSE">Computer Science and Engineering</option>
              <option value="ECE">Electronics and Communication Engineering</option>
              <option value="EEE">Electrical and Electronics Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CHEM">Chemical Engineering</option>
              <option value="MME">Metallurgical and Materials Engineering</option>
            </select>
          </label>

          {/* Year Dropdown */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Year</span>
            <select
              name="year"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled selected>Select your year</option>
              <option value="E-1">E-1 (First Year)</option>
              <option value="E-2">E-2 (Second Year)</option>
              <option value="E-3">E-3 (Third Year)</option>
              <option value="E-4">E-4 (Fourth Year)</option>
            </select>
          </label>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-purple-600 hover:text-purple-500">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default StudentSignUp;