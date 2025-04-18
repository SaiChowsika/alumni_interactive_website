import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

const StudentProfile = () => {
  const studentData = {
    profileImage: 'src/assets/profile1.jpg',
    fullName: 'Vinay Repalle',
    username: 'vinayrepalle',
    id: 'N201234',
    mailId: 'vinayrepalle@gmail.com',
    phoneNumber: '+32112345689',
    department: 'CSE',
    yearOfStudy: 'E3',
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
      options: ['E1', 'E2', 'E3', 'E4'],
    },
  ];

  const handleSave = (updatedData) => {
    console.log('Updated Student Data:', updatedData);
    // Save the updated data (e.g., send it to a backend API)
  };

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