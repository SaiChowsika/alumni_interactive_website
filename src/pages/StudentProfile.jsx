import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import SubmissionHistory from '../components/SubmissionHistory';
import { useAuth } from '../context/AuthContext';

const StudentProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Form data for the Submit Form tab
  const [formData, setFormData] = useState({
    company: '',
    location: '',
    type: '', // intern or placement
    stipend: '', // for intern
    ctc: '', // for placement
    joiningDate: '',
    howDidYouGetIt: '', // campus placement or own search
    additionalInfo: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    setCurrentUser(user);
    setLoading(false);
  }, []); // Empty dependency array

  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    setSubmissionError(null);
    
    // Mock submissions instead of API call
    setTimeout(() => {
      setSubmissions([]);
      setSubmissionsLoading(false);
    }, 1000);
  };

  const handleSubmissionSuccess = (newSubmission) => {
    setSubmissions(prev => [newSubmission, ...prev]);
    setActiveTab('submissions');
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const submissionData = {
        ...formData,
        studentId: currentUser?.studentId || 'N/A',
        studentName: currentUser?.fullName || 'N/A',
        email: currentUser?.email || 'N/A',
        submittedAt: new Date().toISOString(),
        _id: Date.now().toString()
      };

      console.log('Submitting placement/internship data:', submissionData);
      
      // Mock success
      setTimeout(() => {
        setFormSuccess(true);
        setFormData({
          company: '',
          location: '',
          type: '',
          stipend: '',
          ctc: '',
          joiningDate: '',
          howDidYouGetIt: '',
          additionalInfo: ''
        });
        
        // Add to submissions
        handleSubmissionSuccess(submissionData);
        
        setFormLoading(false);
        
        // Hide success message after 3 seconds
        setTimeout(() => setFormSuccess(false), 3000);
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Failed to submit form. Please try again.');
      setFormLoading(false);
    }
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
            
            {/* Success Message */}
            {formSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Information submitted successfully!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{formError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6 max-w-2xl">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter company name"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter location"
                />
              </div>

              {/* Type of Job */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Job *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Type</option>
                  <option value="intern">Intern</option>
                  <option value="placement">Placement</option>
                </select>
              </div>

              {/* Stipend (for Intern) */}
              {formData.type === 'intern' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stipend
                  </label>
                  <input
                    type="text"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter stipend amount"
                  />
                </div>
              )}

              {/* CTC (for Placement) */}
              {formData.type === 'placement' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTC
                  </label>
                  <input
                    type="text"
                    name="ctc"
                    value={formData.ctc}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter CTC amount"
                  />
                </div>
              )}

              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joining Date *
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* How did you get it */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you get it? *
                </label>
                <select
                  name="howDidYouGetIt"
                  value={formData.howDidYouGetIt}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Option</option>
                  <option value="campus-placement">Campus Placement</option>
                  <option value="own-search">Own Search</option>
                </select>
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Info
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Any additional information..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
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