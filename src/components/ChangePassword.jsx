import React, { useState } from 'react';
import ModernSuccessAlert from './ModernSuccessAlert'; // Adjust the import path as needed

const ChangePassword = () => {
  const [step, setStep] = useState(1); // 1: Current Password, 2: New Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handleCurrentPasswordSubmit = (e) => {
    e.preventDefault();
    if (currentPassword === 'correctpassword') {
      setStep(2);
      setError('');
    } else {
      setError('Incorrect current password. Please try again.');
    }
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
    } else {
      setError('');
      setShowAlert(true);
      setStep(1);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Change Password</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Update your password to keep your account secure.
        </p>

        {/* Password Change Form */}
        <div className="mt-6 space-y-6">
          {/* Step 1: Current Password */}
          {step === 1 && (
            <form onSubmit={handleCurrentPasswordSubmit} className="space-y-4">
              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">Current Password</span>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm cursor-pointer font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Next
              </button>
            </form>
          )}

          {/* Step 2: New Password */}
          {step === 2 && (
            <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">New Password</span>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
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

              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</span>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

              {/* Change Password Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm cursor-pointer font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Change Password
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Success Alert */}
      {showAlert && (
        <ModernSuccessAlert
          message="Password changed successfully!"
          onClose={closeAlert}
        />
      )}
    </section>
  );
};

export default ChangePassword;