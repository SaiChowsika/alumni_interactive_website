import React from 'react';

const Carousel = () => {
  return (
    <div className="w-full overflow-hidden ">
      <div className="relative w-full h-80 sm:h-96 md:h-90 transform transition-transform duration-300 hover:scale-105">
        {/* Radio buttons for navigation */}
        <input
          className="hidden peer/carousel-1"
          type="radio"
          id="carousel-1"
          name="carousel"
          defaultChecked
        />
        <input
          className="hidden peer/carousel-2"
          type="radio"
          id="carousel-2"
          name="carousel"
        />
        <input
          className="hidden peer/carousel-3"
          type="radio"
          id="carousel-3"
          name="carousel"
        />
        <input
          className="hidden peer/carousel-4"
          type="radio"
          id="carousel-4"
          name="carousel"
        />
        <input
          className="hidden peer/carousel-5"
          type="radio"
          id="carousel-5"
          name="carousel"
        />

        {/* Carousel items with fallback backgrounds */}
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-1:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">RGUKT Campus</h3>
              <p className="text-xl">Folk Song Event 2024</p>
            </div>
          </div>
        </div>
        
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-2:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">IIIT Campus</h3>
              <p className="text-xl">Academic Excellence</p>
            </div>
          </div>
        </div>
        
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-3:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">Student Life</h3>
              <p className="text-xl">Campus Activities</p>
            </div>
          </div>
        </div>
        
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-4:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">Innovation Hub</h3>
              <p className="text-xl">Technology & Learning</p>
            </div>
          </div>
        </div>
        
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-5:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">Alumni Network</h3>
              <p className="text-xl">Building Connections</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <label
          htmlFor="carousel-5"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-2"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition"
        >
          ›
        </label>

        <label
          htmlFor="carousel-1"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-2:block"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-3"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-2:block"
        >
          ›
        </label>

        <label
          htmlFor="carousel-2"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-3:block"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-4"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-3:block"
        >
          ›
        </label>

        <label
          htmlFor="carousel-3"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-4:block"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-5"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-4:block"
        >
          ›
        </label>

        <label
          htmlFor="carousel-4"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-5:block"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-1"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-3 py-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition hidden peer-checked/carousel-5:block"
        >
          ›
        </label>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <label
            htmlFor="carousel-1"
            className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer opacity-50 hover:opacity-100 peer-checked/carousel-1:bg-blue-500"
          ></label>
          <label
            htmlFor="carousel-2"
            className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer opacity-50 hover:opacity-100 peer-checked/carousel-2:bg-blue-500"
          ></label>
          <label
            htmlFor="carousel-3"
            className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer opacity-50 hover:opacity-100 peer-checked/carousel-3:bg-blue-500"
          ></label>
          <label
            htmlFor="carousel-4"
            className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer opacity-50 hover:opacity-100 peer-checked/carousel-4:bg-blue-500"
          ></label>
          <label
            htmlFor="carousel-5"
            className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer opacity-50 hover:opacity-100 peer-checked/carousel-5:bg-blue-500"
          ></label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;