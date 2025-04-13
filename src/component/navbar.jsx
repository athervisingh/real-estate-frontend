import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);


  return (
    <nav className={`fixed top-0 w-[100vw] left-0 right-0 z-50 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'} py-2 px-4 md:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <a href="/" className="flex-shrink-0">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16" 
            />
          </a>
          <a href="/" className="hidden sm:block text-xs md:text-sm lg:text-base">
            <span className="text-gray-400">Empire<span className='text-gray-500'>Key</span></span>Prop <br/> 
            <span className='text-gray-400'>Real</span> Estate
          </a>
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
          <a href="/about" className="text-gray-700 hover:text-[#f8bd0f] text-sm lg:text-base font-medium transition-colors duration-300">
            About Us
          </a>
          <a href="/find-my-agent" className="text-gray-700 hover:text-[#f8bd0f] text-sm lg:text-base font-medium transition-colors duration-300">
            Find my Agent
          </a>
          <a href="/floor-plans" className="text-gray-700 hover:text-[#f8bd0f] text-sm lg:text-base font-medium transition-colors duration-300">
            Floor Plans
          </a>
          <a href="/agent-portal" className="text-gray-700 hover:text-[#f8bd0f] text-sm lg:text-base font-medium transition-colors duration-300">
            Agent Portal
          </a>
          <a href="/contact" className="text-white bg-[#f8bd0f] hover:bg-[#e5ad0e] px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-300">
            Contact Us
          </a>

        
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-[#f8bd0f] focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Slide down animation */}
      <div 
        className={`md:hidden overflow-hidden ease-in-out ${isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="mt-2 pt-2 pb-3 border-t border-gray-200">
          <a 
            href="/about" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#f8bd0f] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </a>
          <a 
            href="/find-my-agent" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#f8bd0f] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Find my Agent
          </a>
          <a 
            href="/floor-plans" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#f8bd0f] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Floor Plans
          </a>
          <a 
            href="/agent-portal" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#f8bd0f] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Agent Portal
          </a>
          <a 
            href="/contact" 
            className="block px-4 py-2 mt-2 text-center bg-[#f8bd0f] text-white hover:bg-[#e5ad0e] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>

       
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
