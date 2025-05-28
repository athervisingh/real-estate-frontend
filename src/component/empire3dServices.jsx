import React from 'react';
import { Link } from 'react-router-dom';
const Empire3dServices = () => {
  const services = [
    {
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      ),
      title: "360° Virtual Property Tours | Immersive Walkthroughs",
      description: "Experience properties like never before with our cutting-edge 360° virtual tours. Walk through every room, explore layouts, and get a realistic feel of the space from anywhere in the world. Interactive hotspots provide detailed information about amenities, dimensions, and features. Perfect for international buyers and remote property viewing."
    },
    {
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      ),
      title: "3D Property Scanning & Digital Mapping",
      description: "Advanced 3D scanning technology captures precise measurements and creates detailed digital twins of properties. Generate accurate floor plans, virtual staging possibilities, and comprehensive property documentation. Our LiDAR scanning ensures millimeter precision for architects, interior designers, and property developers."
    },
    {
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
      title: "VR Property Visualization & Virtual Staging",
      description: "Transform empty spaces with virtual staging and photorealistic 3D renderings. Experience properties through VR headsets for the most immersive viewing experience. Customize interiors, test different layouts, and visualize renovation possibilities before making decisions. Revolutionary technology for modern property marketing."
    }
  ];

  return (
    <div className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
              GET TO KNOW US
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Market Leader in <span className="text-cyan-400">360° Virtual Property Solutions.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
              Your Trusted Partner for 360°, 3D, and VR Property Solutions in Dubai, UAE. With over 18 years of experience in virtual property technology, we've mastered the art of creating immersive digital property experiences. Our extensive portfolio of 9000+ virtual property tours showcases our expertise in delivering cutting-edge 360° and 3D visualization solutions for real estate agents, developers, and property investors across the UAE.
            </p>
          </div>
          
          <div className="lg:w-1/3 flex justify-end" >
           <Link
        to="/about"
        className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block text-center"
      >
        More About Us
      </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-cyan-400 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>

              {/* Call to Action */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-cyan-400 hover:text-white font-semibold text-sm flex items-center gap-2">
                  Explore Technology
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">9000+</div>
            <div className="text-gray-400 text-sm">Virtual Property Tours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">18+</div>
            <div className="text-gray-400 text-sm">Years in VR Technology</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">360°</div>
            <div className="text-gray-400 text-sm">Immersive Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">4K</div>
            <div className="text-gray-400 text-sm">Ultra HD Quality</div>
          </div>
        </div>

        {/* Technology Features */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Advanced Technology Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">360°</span>
              </div>
              <p className="text-sm text-gray-300">Panoramic Views</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3D</span>
              </div>
              <p className="text-sm text-gray-300">Spatial Mapping</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">VR</span>
              </div>
              <p className="text-sm text-gray-300">Virtual Reality</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">AI</span>
              </div>
              <p className="text-sm text-gray-300">Smart Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empire3dServices