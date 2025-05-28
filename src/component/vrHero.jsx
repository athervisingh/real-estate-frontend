import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const VRHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Hero Background Image with Zoom Animation */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-3000 ease-out ${
          isLoaded ? 'scale-100' : 'scale-150'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/c1.png')`
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className={`max-w-4xl mx-auto transform transition-all duration-2000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            360 VR Home
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide">
            One stop <span className="text-yellow-400 font-medium">360 VR & 3D Solutions</span>
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-2000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Link to='https://pixelstreaming.damaclabs.com/damac' className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Explore VR World
            </Link>
          
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* VR Icons floating */}
        <div className={`absolute top-1/4 left-1/4 transform transition-all duration-3000 delay-1500 ${
          isLoaded ? 'translate-x-0 opacity-60' : '-translate-x-20 opacity-0'
        }`}>
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center rotate-12">
            <span className="text-white font-bold text-lg">VR</span>
          </div>
        </div>
        
        <div className={`absolute top-1/3 right-1/4 transform transition-all duration-3000 delay-2000 ${
          isLoaded ? 'translate-x-0 opacity-60' : 'translate-x-20 opacity-0'
        }`}>
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center -rotate-12">
            <span className="text-white font-bold text-xl">360</span>
          </div>
        </div>

        <div className={`absolute bottom-1/3 left-1/3 transform transition-all duration-3000 delay-2500 ${
          isLoaded ? 'translate-y-0 opacity-60' : 'translate-y-10 opacity-0'
        }`}>
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center rotate-45">
            <span className="text-white font-bold text-sm">3D</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-3000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2 tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRHero;