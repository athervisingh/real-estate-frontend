import React from 'react';

export default function RealEstateServices() {
  const services = [
    {
      id: 1,
      title: "Property Consulting",
      description: "Expert guidance through every step of your property journey with personalized consulting services tailored to your needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Premium Listings",
      description: "Access to exclusive properties across UAE's most prestigious locations, from luxury penthouses to waterfront villas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Investment Opportunities",
      description: "Strategic investment advisory for high-yield property acquisitions, development projects, and portfolio diversification.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Property Management",
      description: "Comprehensive management services for property owners, including tenant relations, maintenance, and financial oversight.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-16 bg-white mb-32 mt-36">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-2xl">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="/images/p10.jpg" 
              alt="Luxury Real Estate Services" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e2f4e]/70 to-transparent flex items-center justify-center lg:justify-start lg:pl-16">
              <div className="text-center lg:text-left max-w-md px-6 lg:px-0">
                <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl">
                  Luxury Real Estate Experience
                </h2>
                <div className="w-20 h-1 bg-white/80 mx-auto lg:mx-0 mt-4"></div>
                <p className="text-white/90 mt-4">
                  Elevating property services across the UAE with unmatched expertise and premium offerings.
                </p>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-white p-8 md:p-12">
            <div className="h-full flex flex-col">
              <div className="mb-8">
                <h3 className="text-[#0e2f4e]/80 font-medium mb-2">OUR EXPERTISE</h3>
                <h2 className="text-[#0e2f4e] text-3xl font-bold">Comprehensive Real Estate Services</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#0e2f4e] to-blue-400 mt-4 rounded"></div>
                <p className="text-gray-600 mt-4">
                  We offer exceptional real estate solutions tailored to your unique needs. Our team of experts delivers personalized service with attention to detail and market insight.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className="p-5 rounded-lg bg-white hover:bg-gray-50 shadow hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="p-3 bg-[#0e2f4e]/10 rounded-full w-fit mb-4">
                      <div className="text-[#0e2f4e]">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0e2f4e] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}