import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

const AdminProfile = () => {
  const adminData = {
    profileImage: 'src/assets/profile1.jpg',
    fullName: 'Admin Name',
    collegeId: 'ADM12345',
    mailId: 'admin@example.com',
    phoneNumber: '+1234567890',
    designation: 'Head of Department',
    role: 'Administrator',
    department: 'CSE',
  };

  const overviewFields = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'collegeId', label: 'College ID', type: 'text' },
    { name: 'mailId', label: 'Email ID', type: 'email' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'department', label: 'Department', type: 'text' },
  ];

  const handleSave = (updatedData) => {
    console.log('Updated Admin Data:', updatedData);
    // Save the updated data (e.g., send it to a backend API)
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Profile
        profileData={adminData}
        overviewFields={overviewFields}
        onSave={handleSave}
      />
      <Footer />
    </div>
  );
};

export default AdminProfile;