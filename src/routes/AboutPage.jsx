import React from 'react';
import { Download } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">About Our Company</h1>
          <div className="h-1 w-24 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          At <b>EmpireKeyProp Real Estate</b>, we specialize in connecting clients with premium properties across the region. With a focus on trust, quality, and personalized service, we make your real estate journey smooth and successful.
          </p>
        </div>

        {/* Mission and Owner Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-white p-10 rounded-2xl shadow-xl transform transition-all hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">Our Mission</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            At EmpireKeyProp Real Estate, our mission is to redefine the property experience by offering innovative, client-focused solutions. We are committed to building lasting relationships through transparency, trust, and a deep understanding of evolving real estate needs—while promoting sustainable and responsible development.
            </p>
            
            <h3 className="mt-10 text-2xl font-bold text-gray-900">Core Values</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              {['Integrity and Transparency', 'Customer-Centric Approach', 'Excellence in Execution', 'Innovation and Creativity',"Market Expertise","Trust and Reliability","Sustainable Practices","Collaboration","Responsiveness"].map((value, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="h-3 w-3 bg-indigo-500 rounded-full"></span>
                  </span>
                  <span className="text-lg">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Owner's Section */}
          <div className="bg-white p-10 rounded-2xl shadow-xl transform transition-all hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-indigo-100 shadow-lg">
                  <img
                    src="/images/Owner.jpeg"
                    alt="Deepak Shaw"
                    className="w-full h-full object-cover transform transition-all hover:scale-105"
                  />
                </div>
              </div>
              <div className="text-center md:text-left leading-[1.8] ">
                <h2 className="text-3xl font-bold text-gray-900">Deepak Shaw</h2>
                <p className="text-xl text-indigo-600 font-semibold">Founder & CEO</p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                <p><em>
    Deepak Shaw, the founder of <strong>EmpireKeyProp Real Estate</strong>, brings valuable experience and insight into the real estate market. He is known for connecting the right property with the right owner at the best value.
  </em></p>
  <p><em>
    Committed to making property ownership accessible to everyone, Deepak ensures clients find homes and investments that match their needs and budget.
  </em></p>
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
            With a strong background in real estate, Deepak Shaw has developed expertise in property consulting, market analysis, and client relationship management. He is passionate about helping clients find the perfect property and is always focused on delivering value, transparency, and trust.
            </p>

            {/* Certifications */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">RERA Certified Agency</h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h4 className="text-xl font-semibold text-gray-900">Download Certificate</h4>
                  </div>
                  <a 
                    href="/certificate.pdf" 
                    download
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Download size={20} className="mr-2" />
                    Download PDF
                  </a>
                </div>
              </div>
              
              <div className="mt-6 ">
              Empire Key Properties L.L.C is officially registered with the Dubai Land Department and the Real Estate Regulatory Agency (RERA). Our license number is <b>1450047</b>, and we are committed to maintaining the highest standards of professionalism, transparency, and client trust in all our property transactions.
              </div>
            </div>

            {/* Experience */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">Experience</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
              With over a year of experience in the real estate industry, Deepak Shaw has successfully assisted clients in finding their ideal properties across various budgets and locations. His expertise lies in property evaluation, market insights, and seamless deal closures, making him a trusted name in the field.
            
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
          <div className="h-1 w-24 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team members who work tirelessly to make your experience exceptional.
          </p>
          
          <div className="mt-12 text-gray-600 italic">
            Team members section will be added soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;