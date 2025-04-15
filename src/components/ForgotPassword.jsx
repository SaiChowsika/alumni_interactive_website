import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Reset Password</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Don’t worry, we’ll send you an email to reset your password.
        </p>

        {/* Reset Password Form */}
        <form className="mt-6 space-y-4">
          {/* Email Input */}
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">Your Email</span>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              placeholder="example@gmail.com"
              inputMode="email"
              required
            />
          </label>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm cursor-pointer font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Reset Password
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/signin" className="text-purple-700 hover:text-purple-900">
              Sign In
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/" className="text-purple-700 hover:text-purple-900">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;