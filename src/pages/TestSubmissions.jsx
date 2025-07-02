import React, { useState, useEffect } from 'react';

const TestSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic Project',
    additionalInfo: ''
  });

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('🔄 Loading submissions...');
      
      const response = await fetch('/api/submissions/all');
      const data = await response.json();
      
      console.log('📋 Response:', data);
      
      if (data.status === 'success') {
        setSubmissions(data.data.submissions);
        console.log(`✅ Loaded ${data.data.submissions.length} submissions`);
      } else {
        setError(data.message || 'Failed to load submissions');
      }
    } catch (error) {
      console.error('❌ Error loading submissions:', error);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const createSubmission = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      console.log('📝 Creating submission:', formData);
      
      const response = await fetch('/api/submissions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log('📋 Create response:', data);
      
      if (data.status === 'success') {
        alert('✅ Submission created successfully!');
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'Academic Project',
          additionalInfo: ''
        });
        
        // Reload submissions
        loadSubmissions();
      } else {
        setError(data.message || 'Failed to create submission');
        alert('❌ Error: ' + (data.message || 'Failed to create submission'));
      }
    } catch (error) {
      console.error('❌ Error creating submission:', error);
      setError('Failed to create submission');
      alert('❌ Error creating submission');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Student Submissions Test ({submissions.length})
      </h1>
      
      {error && (
        <div style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          ❌ {error}
        </div>
      )}

      {/* Refresh Button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          onClick={loadSubmissions}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Create Form */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Create New Submission</h2>
        
        <form onSubmit={createSubmission}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title:
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="Enter submission title"
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Category:
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="Academic Project">Academic Project</option>
              <option value="Research Proposal">Research Proposal</option>
              <option value="Internship Application">Internship Application</option>
              <option value="Placement Application">Placement Application</option>
              <option value="Event Proposal">Event Proposal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Description:
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
              placeholder="Describe your submission"
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Additional Info:
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
              rows={3}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
              placeholder="Any additional information"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ✅ Create Submission
          </button>
        </form>
      </div>

      {/* Submissions List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>All Submissions</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '18px' }}>Loading submissions...</div>
          </div>
        ) : submissions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '18px' }}>No submissions found</div>
            <div style={{ fontSize: '14px', marginTop: '10px' }}>
              Create your first submission above!
            </div>
          </div>
        ) : (
          <div>
            {submissions.map((sub) => (
              <div key={sub._id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '10px'
                }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                    {sub.title}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: '#fff3cd',
                    color: '#856404'
                  }}>
                    {sub.status}
                  </span>
                </div>
                
                <p style={{ color: '#2196F3', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                  {sub.category}
                </p>
                
                <p style={{ color: '#555', margin: '0 0 10px 0' }}>
                  {sub.description}
                </p>
                
                {sub.additionalInfo && (
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>
                    <strong>Additional Info:</strong> {sub.additionalInfo}
                  </p>
                )}
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#888', 
                  borderTop: '1px solid #ddd',
                  paddingTop: '10px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '5px'
                }}>
                  <p style={{ margin: 0 }}><strong>ID:</strong> {sub._id}</p>
                  <p style={{ margin: 0 }}><strong>Student:</strong> {sub.studentName}</p>
                  <p style={{ margin: 0 }}><strong>Department:</strong> {sub.department}</p>
                  <p style={{ margin: 0 }}><strong>Year:</strong> {sub.yearOfStudy}</p>
                  <p style={{ margin: 0 }}>
                    <strong>Created:</strong> {new Date(sub.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSubmissions;