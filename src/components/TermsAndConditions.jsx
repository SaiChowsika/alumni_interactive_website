import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TermsAndConditions = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    jobType: 'placement', // 'placement' or 'internship'
    startDate: '',
    duration: '',
    stipend: '',
    termsAccepted: false
  });

  const [formStatus, setFormStatus] = useState('pending'); // 'pending', 'accepted', 'rejected'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to submit form
      setFormStatus('pending');
      // Show success message
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (user?.role !== 'student' || !['E-3', 'E-4'].includes(user?.yearOfStudy)) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Placement/Internship Form</h3>
      
      {/* Form Status Indicator */}
      <div className="mb-6">
        <span className={`px-4 py-2 rounded-full text-sm ${
          formStatus === 'accepted' ? 'bg-green-100 text-green-800' :
          formStatus === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          Status: {formStatus.charAt(0).toUpperCase() + formStatus.slice(1)}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="placement">Placement</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (in months)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stipend/CTC
            </label>
            <input
              type="text"
              name="stipend"
              value={formData.stipend}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="rounded border-gray-300"
              required
            />
            <span className="text-sm text-gray-700">
              I accept the terms and conditions of the placement/internship
            </span>
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={!formData.termsAccepted}
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default TermsAndConditions; 