import React from 'react';
import HeroSearch from './heroSearch';

const RealEstateHero = () => {
  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/p8.jpg" 
          alt="Real Estate Background" 
          className="w-full h-full"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Hero Heading */}
        <div className="pt-24 pb-8 px-6 md:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff]">Real homes live here</h1>
          <p className="text-xl md:text-2xl text-[#ffffff] mt-2">Real Prices. Real Photos. Real Properties.</p>
        </div>

<HeroSearch/>
      </div>
    </div>
  );
};

export default RealEstateHero;