
// It is just a component which displays the session requesting card.....

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const RequestSession = () => {
  return (
    <div className="mx-auto p-2 mt-1">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Request Session Card */}
        <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
          {/* Image */}
          <img
            className="w-full h-40 object-cover rounded-t-md" // Keep the image size as is
            src="src/assets/reqSession.jpg" // Replace with your image path
            alt="Image Description"
          />

          {/* Card Body */}
          <div className="card-body p-4 flex justify-between items-center">
            {/* Title */}
            <h3 className="text-lg font-bold text-white">Request Session</h3>
            {/* Button */}
            <Link
              to="/sessionform" // Update the path to match the route in App.jsx
              className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
            >
              Click here..
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSession;