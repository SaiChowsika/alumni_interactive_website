import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const StudentProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  const fetchCurrentUserData = async () => {
    try {
      // Try to get fresh data from API
      const response = await authService.getCurrentUser();
      if (response.status === 'success') {
        setCurrentUser(response.data.user);
      } else {
        // Fallback to context user
        setCurrentUser(user);
      }
    } catch (error) {
      console.log('Using context user data');
      setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  };

  // Use actual logged-in user data instead of hardcoded data
  const studentData = {
    profileImage: currentUser?.profilePhoto || 'src/assets/profile1.jpg',
    fullName: currentUser?.fullName || 'Not available',
    username: currentUser?.email?.split('@')[0] || 'username',
    id: currentUser?.studentId || 'Not available',
    mailId: currentUser?.email || 'Not available',
    phoneNumber: currentUser?.phoneNumber || 'Not available',
    department: currentUser?.department || 'Not available',
    yearOfStudy: currentUser?.yearOfStudy || 'Not available',
  };

  const overviewFields = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'id', label: 'ID', type: 'text' },
    { name: 'mailId', label: 'Mail ID', type: 'email' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'CHEM', 'MME'],
    },
    {
      name: 'yearOfStudy',
      label: 'Year of Study',
      type: 'select',
      options: ['E-1', 'E-2', 'E-3', 'E-4'],
    },
  ];

  const handleSave = (updatedData) => {
    console.log('Updated Student Data:', updatedData);
    // Save the updated data (e.g., send it to a backend API)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Profile
        profileData={studentData}
        overviewFields={overviewFields}
        onSave={handleSave}
      />
      <Footer />
    </div>
  );
};

export default StudentProfile;