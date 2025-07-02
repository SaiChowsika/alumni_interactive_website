import React from 'react';
import Header from '../components/Header';
import LandingPageNavbar from '../components/LandingPageNavbar';
import Footer from '../components/Footer';
import PlacementsProgres from '../components/PlacementsProgres';
import ChatBot from '../components/ChatBot';

const LandingPage = () => {
  return (
    <>
      <Header />
      <LandingPageNavbar />
      <div className="flex flex-col md:flex-row">
        {/* Simple Image Banner instead of Carousel for now */}
        <div className="w-full md:min-w-[full] md:flex-1">
          <div className="w-full overflow-hidden">
            <div className="relative w-full h-80 sm:h-96 md:h-90 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to RGUKT Alumni
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    Connecting Past, Present, and Future
                  </p>
                  <div className="space-x-4">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                      Join Network
                    </button>
                    <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PlacementsProgress - Takes remaining space on large screens */}
        <div className="lg:w-[450px] mt-4 md:mt-0">
          <PlacementsProgres />
        </div>
      </div>

      <div className="m-1 p-2 border border-gray-400 rounded-2xl text-md">
        <h2 className="font-bold mx-2 mb-4 text-xl text-gray-800">About Our Platform</h2>
        <p className="text-gray-700 leading-relaxed">
          This platform is designed to bridge the gap between RGUKT alumni and current students, fostering meaningful connections and opportunities. Alumni can conduct sessions, share job and internship openings, and guide students through their professional journeys. Faculty members oversee and approve these initiatives to ensure alignment with institutional goals. Students gain access to approved events, opportunities, and mentorship, empowering them to grow academically and professionally. Together, we build a stronger RGUKT community, where knowledge, experience, and collaboration thrive. Join us in shaping the future of RGUKT students!
        </p>
      </div>

      <Footer />
      <ChatBot />
    </>
  );
};

export default LandingPage;