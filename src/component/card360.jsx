import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card360 = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/3dspace');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer h-[70vh] w-[72vw] mx-auto relative"
      style={{
        backgroundImage: "url('/images/card360.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f4e]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Top content - appears on hover */}
      <div className="absolute top-4 left-4 transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="px-3 py-1 bg-white text-[#0e2f4e] text-sm font-medium rounded-full shadow-lg">Explore</span>
      </div>

      {/* Main content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-lg">
          Explore 3D Space
        </h2>
        <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-200 transition-colors duration-300 drop-shadow-lg">
          360° Property View by EmpireKey
        </h3>
        <p className="text-gray-200 text-sm mb-4 line-clamp-2 drop-shadow-md">
          Step inside your future home! Explore every angle in stunning 3D and experience the space as if you're really there.
        </p>
        
        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            UAE
          </div>
          <div className="text-sm text-white font-medium group-hover:underline bg-[#0e2f4e]/70 px-3 py-1 rounded-full backdrop-blur-sm">
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card360;
