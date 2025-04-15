import React from 'react';

const PlacementsProgres = () => {
  return (
    <div className="bg-gray-100 shadow-sm p-4 w-full h-90 ">
      {/* Padding container to create 8px spacing */}
      <div className="min-[400px]:p-5 border-2 rounded-2xl bg-white border-gray-200 transform transition-transform duration-300 hover:scale-105 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-red-900">Placements Progress In Past Three Years</h3>
        </div>

        {/* Vertical Bar Graphs */}
        <div className="flex justify-center items-end space-x-8 mb-6 h-48">
          {/* 2024 Bar */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-40 bg-white rounded-t-lg flex items-end">
              {/* change the height % here so that it is dynamic */}
              <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: '75%' }}>
                <div className="flex items-center justify-center text-white text-xs h-full">75%</div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-800 mt-2">2024</span>
          </div>
          
          {/* 2023 Bar */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-40 bg-white rounded-t-lg flex items-end">
              {/* change the height % here so that it is dynamic */}
              <div className="w-full bg-orange-500 rounded-t-lg" style={{ height: '85%' }}>
                <div className="flex items-center justify-center text-white text-xs h-full">85%</div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-800 mt-2">2023</span>
          </div>
          
          {/* 2022 Bar */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-40 bg-white rounded-t-lg flex items-end">
             {/* change the height % here so that it is dynamic */}
              <div className="w-full bg-red-500 rounded-t-lg" style={{ height: '80%' }}>  
                <div className="flex items-center justify-center text-white text-xs h-full">80%</div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-800 mt-2">2022</span>
          </div>
        </div>

        {/* Data Labels */}
        <div className="flex justify-center space-x-5">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-[13px] text-gray-800 ">2024 - 75%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-[13px] text-gray-800">2023 - 85%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-[13px] text-gray-800">2022 - 80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementsProgres;