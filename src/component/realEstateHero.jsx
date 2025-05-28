import React, { useEffect, useState } from 'react';
import HeroSearch from './heroSearch';

const RealEstateHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/p8.jpg"
          alt="Real Estate Background"
          className={`w-full h-full object-cover transition-transform duration-[18000ms] ease-linear ${
            isLoaded ? 'scale-100' : 'scale-135'
          }`}
        />
        {/* Optional overlay - uncomment if needed */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
      </div>

      {/* Main Content */}
      <div className={`relative z-10 h-full flex flex-col `}>
        {/* Hero Heading */}
        <div className="pt-24 pb-8 px-6 md:px-16 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold text-[#ffffff] transition-all duration-2000 delay-1500 ease-out `}>
            Real homes live here
          </h1>
          <p className={`text-xl md:text-2xl text-[#ffffff] mt-2 transition-all duration-2000 delay-2000 ease-out `}>
            Real Prices. Real Photos. Real Properties.
          </p>
        </div>
        <div >
          <HeroSearch/>
        </div>
      </div>
    </div>
  );
};

export default RealEstateHero;