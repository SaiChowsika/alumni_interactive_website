import React, { useState, useEffect } from 'react';
import { submissionService } from '../services/api';

const SubmissionsTab = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic Project',
    additionalInfo: ''
  });

  // Load submissions when component mounts
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        console.log('Fetching submissions...');
        
        const response = await submissionService.getSubmissions();
        console.log('Fetch response:', response);
        
        if (response.status === 'success') {
          setSubmissions(response.data.submissions);
          console.log('Submissions loaded:', response.data.submissions.length);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      console.log('Submitting:', formData);
      
      const response = await submissionService.createSubmission(formData);
      console.log('Create response:', response);
      
      if (response.status === 'success') {
        // Add the new submission to the list immediately
        setSubmissions(prev => [response.data.submission, ...prev]);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'Academic Project',
          additionalInfo: ''
        });
        
        alert('Submission created successfully!');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Submissions ({submissions.length})</h2>
      
      {/* Refresh Button */}
      <button 
        onClick={loadSubmissions}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Refresh Submissions
      </button>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Create New Submission</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Academic Project">Academic Project</option>
              <option value="Research Proposal">Research Proposal</option>
              <option value="Internship Application">Internship Application</option>
              <option value="Placement Application">Placement Application</option>
              <option value="Event Proposal">Event Proposal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Additional Info:</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Submissions List */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission._id} className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-bold">{submission.title}</h3>
              <p className="text-blue-600 font-medium">{submission.category}</p>
              <p className="text-gray-700 mt-2">{submission.description}</p>
              {submission.additionalInfo && (
                <p className="text-gray-600 mt-2">{submission.additionalInfo}</p>
              )}
              <div className="mt-3 text-sm text-gray-500">
                <p>Status: <span className="font-medium">{submission.status}</span></p>
                <p>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          
          {submissions.length === 0 && !loading && (
            <p className="text-center text-gray-500">No submissions found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionsTab;