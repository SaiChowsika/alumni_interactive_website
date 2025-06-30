import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const TermsAndConditions = () => {
  const { user } = useAuth();
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submissionData = {
        ...formData,
        studentId: user?.studentId || 'N/A',
        studentName: user?.fullName || 'N/A',
        email: user?.email || 'N/A',
        submittedAt: new Date().toISOString()
      };

      console.log('Submitting placement/internship data:', submissionData);
      
      // Mock success
      setTimeout(() => {
        setSuccess(true);
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
        setLoading(false);
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          
          {/* Student Details Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <p className="text-gray-800">{user?.fullName || 'Not available'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Student ID:</span>
                  <p className="text-gray-800">{user?.studentId || 'Not available'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <p className="text-gray-800">{user?.email || 'Not available'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Department:</span>
                  <p className="text-gray-800">{user?.department || 'Not available'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Year of Study:</span>
                  <p className="text-gray-800">{user?.yearOfStudy || 'Not available'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-800">{user?.phoneNumber || 'Not available'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Form</h2>
            
            {/* Success Message */}
            {success && (
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
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Any additional information..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;