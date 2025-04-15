import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

const AlumniProfile = () => {
  const alumniData = {
    profileImage: 'src/assets/profile1.jpg',
    fullName: 'John Doe',
    collegeId: 'A202345',
    mailId: 'johndoe@gmail.com',
    phoneNumber: '+1234567890',
    graduationYear: '2020',
    currentJob: 'Software Engineer',
  };

  const overviewFields = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'collegeId', label: 'College ID', type: 'text' },
    { name: 'mailId', label: 'Email ID', type: 'email' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    { name: 'graduationYear', label: 'Graduation Year', type: 'text' },
    { name: 'currentJob', label: 'Current Job', type: 'text' },
  ];

  const handleSave = (updatedData) => {
    console.log('Updated Alumni Data:', updatedData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Profile
        profileData={alumniData}
        overviewFields={overviewFields}
        onSave={handleSave}
      />
      <Footer />
    </div>
  );
};

export default AlumniProfile;