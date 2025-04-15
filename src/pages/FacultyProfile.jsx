import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

const FacultyProfile = () => {
  const facultyData = {
    profileImage: 'src/assets/profile1.jpg',
    fullName: 'Faculty Name',
    collegeId: 'FAC12345',
    mailId: 'faculty@example.com',
    phoneNumber: '+1234567890',
    designation: 'Assistant Professor',
    department: 'CSE',
  };

  const overviewFields = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'collegeId', label: 'College ID', type: 'text' },
    { name: 'mailId', label: 'Email ID', type: 'email' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'department', label: 'Department', type: 'text' },
  ];

  const handleSave = (updatedData) => {
    console.log('Updated Faculty Data:', updatedData);
    // Save the updated data (e.g., send it to a backend API)
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Profile
        profileData={facultyData}
        overviewFields={overviewFields}
        onSave={handleSave}
      />
      <Footer />
    </div>
  );
};

export default FacultyProfile;