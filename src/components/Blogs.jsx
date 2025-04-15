import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  return (
    <div className="mx-auto p-2 mt-1">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 - Ongoing Sessions */}
        <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
          <img
            className="w-full h-40 object-cover rounded-t-md"
            src="src/assets/type4OS.jpg"
            alt="Ongoing Sessions"
          />
          <div className="card-body p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Ongoing Sessions</h3>
            <Link
              className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
              to="/sessions#ongoing" // Add hash fragment
            >
              View More
            </Link>
          </div>
        </div>

        {/* Card 2 - Upcoming Sessions */}
        <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
          <img
            className="w-full h-40 object-cover rounded-t-md"
            src="src/assets/type4US.jpg"
            alt="Upcoming Sessions"
          />
          <div className="card-body p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Upcoming Sessions</h3>
            <Link
              className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
              to="/sessions#upcoming" // Add hash fragment
            >
              View More
            </Link>
          </div>
        </div>

        {/* Card 3 - Previous Sessions */}
        <div className="card shadow-lg rounded-md overflow-hidden bg-slate-700 transition-transform duration-300 hover:scale-105">
          <img
            className="w-full h-40 object-cover rounded-t-md"
            src="src/assets/type4PS.jpg"
            alt="Previous Sessions"
          />
          <div className="card-body p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Previous Sessions</h3>
            <Link
              className="btn gap-x-2 bg-indigo-400 text-white border-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-indigo-800 hover:border-indigo-800 active:bg-indigo-800 active:border-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block px-4 py-2 rounded-md transition-all duration-300"
              to="/sessions#previous" // Add hash fragment
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;


    // Code for different tpe of cars\d model ....

        {/* // <section class="px-4 py-4 mx-auto max-w-7xl broder border-black">
        // <h2 class="mb-2 text-2xl font-extrabold leading-tight text-gray-900">Skcript Blog</h2>
        // <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        //     <div>
        //     <a href="#">
        //         <img src="src/assets/type1OS.jpg"" class="object-cover w-full h-56 mb-5 bg-center rounded" alt="Kutty" loading="lazy" />
        //     </a>
        //     <h2 class="mb-2 text-lg font-semibold text-gray-900">
        //         <a href="#" class="text-gray-900 hover:text-purple-700">Process Documents Using Artificial Intelligence For RPA Bots</a>
        //     </h2>
        //     </div>
        //     <div>
        //     <a href="#">
        //         <img src="src/assets/type1OS.jpg"" class="object-cover w-full h-56 mb-5 bg-center rounded" alt="Kutty" loading="lazy" />
        //     </a>
        //     <h2 class="mb-2 text-lg font-semibold text-gray-900">
        //         <a href="#" class="text-gray-900 hover:text-purple-700">Implement Dark Mode in Your Android App</a>
        //     </h2>
        //     </div>
        //     <div>
        //     <a href="#">
        //         <img src="src/assets/type1OS.jpg"" class="object-cover w-full h-56 mb-5 bg-center rounded" alt="Kutty" loading="lazy" />
        //     </a>
        //     <h2 class="mb-2 text-lg font-semibold text-gray-900">
        //         <a href="#" class="text-gray-900 hover:text-purple-700">Why is Mental Health one of the Important Issues to Address?</a>
        //     </h2>
        //     </div>
        //    </div>
        // </section> */}

