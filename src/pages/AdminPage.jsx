import React from 'react';
import Header from '../components/Header';
import MainNavbar from '../components/MainNavbar';
import Carousel from '../components/Carousel';
import PlacementsProgres from '../components/PlacementsProgres';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import AdminNotifications from '../components/AdminNotifications';

const AdminPage = () => {
  return (
    <>
      <Header />
      <MainNavbar />
      <div className="flex flex-col md:flex-row">
        {/* Carousel - Full width on small screens, fixed width on large screens */}
        <div className="w-full md:min-w-[full] md:flex-1">
          <Carousel />
        </div>
        {/* PlacementsProgress - Takes remaining space on large screens */}
        <div className="lg:w-[450px] mt-4 md:mt-0">
          <PlacementsProgres />
        </div>
      </div>
      <Blogs />
      <div className="mx-auto p-2 mt-1">


        {/* Admin Notifications Section */}
        {/* <div className="mb-8">
          click here.........
          <AdminNotifications />
        </div> */}

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Request Session Card */}
          <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
              className="w-full h-40 object-cover-top rounded-t-md"
              src="src/assets/reqSession.jpg"
              alt="Request Session"
            />

            {/* Card Body */}
            <div className="card-body p-4 flex justify-between items-center">
              {/* Title */}
              <h3 className="text-lg font-bold text-white">Request Session</h3>
              {/* Button */}
              <Link
                to="/sessionform"
                className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
              >
                Click here..
              </Link>
            </div>
          </div>
          {/* Statistics Card */}
          <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
              className="w-full h-40 object-cover-top rounded-t-md"
              src="src/assets/stats.webp"
              alt="Statistics"
            />

            {/* Card Body */}
            <div className="card-body p-4 flex justify-between items-center">
              {/* Title */}
              <h3 className="text-lg font-bold text-white">View Statistics</h3>
              {/* Button */}
              <Link
                to="/statistics"
                className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
              >
                Click here..
              </Link>
            </div>
          </div>
          {/* Session Upload Card */}
          <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
              className="w-full h-40 object-cover-top rounded-t-md"
              src="src/assets/sessionUpload.webp"
              alt="Session Upload"
            />

            {/* Card Body */}
            <div className="card-body p-4 flex justify-between items-center">
              {/* Title */}
              <h3 className="text-lg font-bold text-white">Upload Session</h3>
              {/* Button */}
              <Link
                to="/sessionupload"
                className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
              >
                Upload
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;