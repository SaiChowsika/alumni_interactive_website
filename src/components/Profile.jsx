import React from 'react';

const Profile = ({ profileData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Section - Reduced padding */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            {/* Smaller profile picture box */}
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/96/6366f1/ffffff?text=Profile';
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {profileData.fullName}
            </h1>
            <p className="text-purple-100 text-lg">@{profileData.username}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm">
                {profileData.department}
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm">
                {profileData.yearOfStudy}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Student Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border">
              {profileData.fullName}
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Student ID</label>
            <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border">
              {profileData.id}
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border">
              {profileData.mailId}
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Phone Number</label>
            <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border">
              {profileData.phoneNumber}
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Department</label>
            <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border">
              {profileData.department}
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Year of Study</label>
            <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border">
              {profileData.yearOfStudy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;