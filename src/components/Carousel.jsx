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

        {/* Carousel items */}
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-1:opacity-100 transition-opacity duration-700 ">
          <img
            src="src/assets/20240112_PA_folksong.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-2:opacity-100 transition-opacity duration-700">
          <img
            src="src/assets/214063-iiit.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-3:opacity-100 transition-opacity duration-700">
          <img
            src="src/assets/19.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-4:opacity-100 transition-opacity duration-700">
          <img
            src="src/assets/images (1).jpeg"
            alt="Slide 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full opacity-0 peer-checked/carousel-5:opacity-100 transition-opacity duration-700">
          <img
            src="src/assets/images.jpeg"
            alt="Slide 5"
            className="w-full h-full object-cover"
          />
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