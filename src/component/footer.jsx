import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, Home, Building, Search, Users, ExternalLink } from 'lucide-react';

export default function Footer() {
  // Real Estate Company data - replace with your information
  const companyInfo = {
    name: "EmpireKeyProp Real Estate",
    logo: "images/logo.png", // Placeholder logo
    social: {
      facebook: "https://www.facebook.com/people/Empirekeyproperties/61575018668996/",
      instagram: "https://www.instagram.com/empirekeyproperties/",
      linkedin: "https://www.linkedin.com/in/deepak-shaw-8923ab35b/"
    },
    contact: {
      email: "owner@empirekeyproperties.com",
      phone: "+971 0585495683",
      address: "Office No. 01B-203, Malik Yousuf Building, Near Yousuf Bakery, Al Murar – Dubai, UAE",
      hours: "Mon-Sat: 8AM-9PM"
    }
  };

  // Owner information
  const ownerInfo = {
    name: "Deepak Shaw"
  };
  
  // Freelancer information
  const freelancerInfo = {
    name: "empire key properties",
    portfolio: "https://www.linkedin.com/in/deepak-shaw-8923ab35b/"
  };

  
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Row 1: Company logo, name and contact details - horizontal */}
        <div className="flex flex-wrap justify-between items-start mb-8 pb-6 border-b border-gray-800">
          {/* Logo and company name */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <img src={companyInfo.logo} alt={`${companyInfo.name} Logo`} className="h-10 w-auto mr-3 invert" />
              <div>
                <h3 className="text-lg font-bold">{companyInfo.name}</h3>
                <p className="text-sm text-gray-400">Founder: {ownerInfo.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">Your trusted real estate partner with over a year of experience. Connecting clients to the right properties at the right price, no matter the budget.</p>
      
          </div>
          
          {/* Our Services */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0 md:px-4">
            <h4 className="text-base font-medium mb-3">Our Services</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Home size={16} className="mr-2" />
                <a href="/contact">Residential Properties</a>
              </li>
              <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Building size={16} className="mr-2" />
                <a href="/contact">Commercial Properties</a>
              </li>
              <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Users size={16} className="mr-2" />
                <a href="/contact">Property Management</a>
              </li>
              <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Search size={16} className="mr-2" />
                <a href="/contact">Property Valuation</a>
              </li>
            </ul>
            
          </div>
          
          {/* Contact details */}
          <div className="w-full md:w-1/3">
            <h4 className="text-base font-medium mb-3">Contact Us</h4>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 shrink-0" />
                {companyInfo.contact.email}
              </p>
              <p className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 shrink-0" />
                {companyInfo.contact.phone}
              </p>
              <p className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2 shrink-0" />
                {companyInfo.contact.address}
              </p>
              <p className="flex items-center text-gray-400">
                <Clock size={16} className="mr-2 shrink-0" />
                {companyInfo.contact.hours}
              </p>
            </div>
          </div>
        </div>
        
        {/* Row 2: Social media links - vertical */}
        <div className="flex justify-around items-center mb-6 pb-4 border-b border-gray-800">
          <div>
          <h4 className="text-base font-medium mb-3">Connect With Us</h4>
          <div className="grid grid-cols-1 gap-3">
            <a href={companyInfo.social.facebook} className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
              <Facebook size={20} className="mr-2" />
              <span>Facebook</span>
            </a>
            <a href={companyInfo.social.instagram} className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
              <Instagram size={20} className="mr-2" />
              <span>Instagram</span>
            </a>
            <a href={companyInfo.social.linkedin} className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
              <Linkedin size={20} className="mr-2" />
              <span>LinkedIn</span>
            </a>
          </div>
          </div>
          <div>
  <h4 className="text-base font-medium mb-3">Quick Links</h4>
  <div className="grid grid-cols-1 gap-3">
    <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
      <Home size={20} className="mr-2" />
      <span>Home</span>
    </a>
    <a href="find-my-agent" className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
      <Users size={20} className="mr-2" />
      <span>Find My Agent</span>
    </a>
    <a href="floor-plans" className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
      <Building size={20} className="mr-2" />
      <span>Floor Plans</span>
    </a>
    <a href="/contact" className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
      <Mail size={20} className="mr-2" />
      <span>Contact Us</span>
    </a>
    <a href="/about" className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
      <Search size={20} className="mr-2" />
      <span>About</span>
    </a>
  </div>
</div>

        </div>
        
        {/* Row 3: Freelancer credit */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            <span>Designed & Developed by </span>
            <a 
              href={freelancerInfo.portfolio} 
              className="text-blue-400 hover:text-blue-300 inline-flex items-center"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {freelancerInfo.name}
              <ExternalLink size={14} className="ml-1" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}