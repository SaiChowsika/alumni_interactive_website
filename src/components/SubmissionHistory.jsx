import React from 'react';
import { format } from 'date-fns';

const SubmissionHistory = ({ submissions, loading, error, onRefresh }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No submissions yet</h3>
        <p className="text-gray-600">You haven't submitted any forms yet. Use the Submit Form tab to create your first submission.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Total submissions: <span className="font-semibold">{submissions.length}</span>
        </p>
        <button
          onClick={onRefresh}
          className="text-sm text-purple-600 hover:text-purple-700 focus:outline-none"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {submissions.map((submission, index) => (
          <div key={submission._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {submission.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{submission.description}</p>
            
            {submission.additionalInfo && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Additional Information:</p>
                <p className="text-sm text-gray-600">{submission.additionalInfo}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                Submitted: {submission.submittedAt ? format(new Date(submission.submittedAt), 'PPp') : 'Unknown date'}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Submitted
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionHistory;