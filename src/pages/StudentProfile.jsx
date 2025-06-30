import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import SubmissionForm from '../components/SubmissionForm';
import SubmissionHistory from '../components/SubmissionHistory';
import { useAuth } from '../context/AuthContext';
import { authService, submissionService } from '../services/api';

const StudentProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  useEffect(() => {
    if (currentUser && (currentUser.yearOfStudy === 'E-3' || currentUser.yearOfStudy === 'E-4')) {
      fetchSubmissions();
    }
  }, [currentUser]);

  const fetchCurrentUserData = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.status === 'success') {
        setCurrentUser(response.data.user);
      } else {
        setCurrentUser(user);
      }
    } catch (error) {
      console.log('Using context user data');
      setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    setSubmissionError(null);
    
    try {
      const response = await submissionService.getSubmissions();
      if (response.status === 'success') {
        setSubmissions(response.data.submissions || []);
      } else {
        setSubmissionError('Failed to load submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissionError('Failed to fetch your submissions. Please try again later.');
    } finally {
      setSubmissionsLoading(false);
    }
  };

  const handleSubmissionSuccess = (newSubmission) => {
    setSubmissions(prev => [newSubmission, ...prev]);
    setActiveTab('submissions'); // Switch to submissions tab to show the new submission
  };

  // Use actual logged-in user data
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
    // Save the updated data
  };

  // Check if student is eligible for submissions (E-3 or E-4)
  const isEligibleForSubmissions = currentUser?.yearOfStudy === 'E-3' || currentUser?.yearOfStudy === 'E-4';

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
      
      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              
              {isEligibleForSubmissions && (
                <>
                  <button
                    onClick={() => setActiveTab('submit')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'submit'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Submit Form
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'submissions'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Your Submissions ({submissions.length})
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <Profile
            profileData={studentData}
            overviewFields={overviewFields}
            onSave={handleSave}
          />
        )}

        {activeTab === 'submit' && isEligibleForSubmissions && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Form</h2>
            <SubmissionForm 
              studentData={studentData} 
              onSubmissionSuccess={handleSubmissionSuccess}
            />
          </div>
        )}

        {activeTab === 'submissions' && isEligibleForSubmissions && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Submissions</h2>
            <SubmissionHistory 
              submissions={submissions}
              loading={submissionsLoading}
              error={submissionError}
              onRefresh={fetchSubmissions}
            />
          </div>
        )}

        {/* Message for non-eligible students */}
        {!isEligibleForSubmissions && activeTab !== 'profile' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-yellow-600 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-yellow-800 mb-1">Submission Access Restricted</h3>
            <p className="text-yellow-700">
              Form submissions are only available for E-3 and E-4 students. 
              Your current year is: <strong>{studentData.yearOfStudy}</strong>
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentProfile;