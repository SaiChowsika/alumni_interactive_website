import React, { useState } from 'react';

// its for creating the session card for the sessions page

const ThreeSessions = ({ sessions, type, isAdmin, onDelete, onCancel, sectionId }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Only show first 3 sessions unless showAll is true
  const displayedSessions = showAll ? sessions : sessions.slice(0, 3);
  const hasMoreSessions = sessions.length > 3;

  const handleViewMore = () => {
    setShowAll(!showAll);
    if (!showAll) {
      // If we're showing more sessions, scroll to the section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-blue-600 text-lg">No {type.toLowerCase()} sessions available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSessions.map((session) => (
          <div 
            key={session.id} 
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                    <img 
                      src={session.profileImage} 
                      alt={session.conductedBy} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {session.conductedBy?.fullName || 'TBA'}
                    </h3>
                    <p className="text-blue-600 text-sm">Session Head</p>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onCancel(session.id)}
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-full transition-colors duration-300"
                      title="Cancel Session"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(session.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full transition-colors duration-300"
                      title="Delete Session"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-50 rounded-md px-3 py-1 mr-2">
                    <span className="text-blue-700 text-sm font-medium">{session.month}</span>
                  </div>
                  <div className="bg-blue-50 rounded-md px-3 py-1">
                    <span className="text-blue-700 text-sm font-medium">{session.date}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-blue-800 mb-2">{session.title}</h4>
                <p className="text-blue-600 text-sm line-clamp-2 mb-2">{session.description}</p>
                {session.department && (
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                    {session.department}
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-blue-600 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{session.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {hasMoreSessions && (
        <div className="mt-8 text-center">
          <button
            onClick={handleViewMore}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-6 rounded-full transition-colors duration-300 border border-blue-200"
          >
            {showAll ? 'Show Less' : 'View More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeSessions;