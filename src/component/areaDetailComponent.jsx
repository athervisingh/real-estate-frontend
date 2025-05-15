import React, { useState, useEffect } from "react";

const AreaDetailComponent = ({ areaData }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFloorplanIndex, setActiveFloorplanIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (areaData) {
      console.log("Area data loaded:", areaData);
    }
  }, [areaData]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      if (processedImages.length > 0) {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % processedImages.length);
      }
    }, 4000);
    return () => clearInterval(imageInterval);
  }, [areaData]);

  useEffect(() => {
    const floorplanInterval = setInterval(() => {
      if (processedFloorplans.length > 0) {
        setActiveFloorplanIndex((prevIndex) => (prevIndex + 1) % processedFloorplans.length);
      }
    }, 5000);
    return () => clearInterval(floorplanInterval);
  }, [areaData]);

  if (!areaData || Object.keys(areaData).length === 0) {
    return <div className="p-6 text-center text-gray-500">No area data available</div>;
  }

  const {
    name = "Property",
    discription = "",
    neighbourhood = [],
    feature = [],
    pdf = "",
    floorplan = [],
    images = [],
  } = areaData;

  const fixGoogleDriveUrl = (url) => {
    if (!url) return "";
    url = url.trim();
    if (url.includes("drive.google.com/file/d/")) {
      const match = url.match(/\/file\/d\/([^\/\s]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    if (url.includes("drive.google.com/open?id=")) {
      const match = url.match(/[?&]id=([^&\s]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  const processedImages = images.map((url) => fixGoogleDriveUrl(url));
  const processedFloorplans = floorplan.map((url) => fixGoogleDriveUrl(url));
  const processedPdf = fixGoogleDriveUrl(pdf);
  const placeholderIframe = "https://via.placeholder.com/800x600?text=Not+Available";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
  
    if (!name || !email || !phone) {
      return alert("Please fill out all fields.");
    }
  
    const message = `Brochure Request:%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}`;
    const whatsappUrl = `https://wa.me/971585495683?text=${message}`;
  
    // Open WhatsApp first
    window.open(whatsappUrl, "_blank");
  
    // Open the brochure PDF with a slight delay to avoid being blocked by the browser
    setTimeout(() => {
      window.open(processedPdf, "_blank");
    }, 10000); // Adjust the delay time if necessary
  
    setFormData({ name: "", email: "", phone: "" });
    setShowForm(false);
  };
  

  return (
    <div className="w-full mt-20 bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#0e2f4e] text-white p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold">{name}</h2>
        <p className="mt-4 text-md md:text-xl opacity-90">{discription || "No description available"}</p>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-10">
        {/* Gallery */}
        <section className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-[#0e2f4e] mb-8 text-center">Property Gallery</h3>
          {processedImages.length > 0 ? (
            <div className="relative mx-auto max-w-5xl">
              <div className="w-full h-[220px] sm:h-[300px] md:h-[450px] bg-gray-100 rounded-lg overflow-hidden transition-all duration-700 transform hover:scale-105 shadow-lg">
                <iframe
                  src={processedImages[activeImageIndex] || placeholderIframe}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">No gallery images available</div>
          )}
        </section>

        {/* Features and Neighborhood */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#0e2f4e] mb-6">Key Features</h3>
            {feature.length > 0 ? (
              <ul className="space-y-4">
                {feature.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="text-[#f8bd0f]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No feature information available</p>
            )}
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#0e2f4e] mb-6">Neighborhood Highlights</h3>
            {neighbourhood.length > 0 ? (
              <ul className="space-y-4">
                {neighbourhood.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="text-[#f8bd0f]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No neighborhood information available</p>
            )}
          </div>
        </section>

        {/* Bouncing Contact Button */}
        <div className="flex justify-center mt-10 relative h-32 mb-20">
          <div
            onClick={() => window.location.href = '/contact'}
            className="w-24 h-24 sm:w-32 sm:h-32 bg-[#f8bd0f] rounded-full absolute cursor-pointer animate-bounce-custom flex items-center justify-center text-center shadow-xl hover:scale-110 transition-transform"
          >
            <span className="text-sm sm:text-lg font-bold text-[#0e2f4e] p-2">Contact for More ⬆️</span>
          </div>
        </div>

        {/* Floor Plans */}
        <section className="mb-28">
          <h3 className="text-xl md:text-2xl font-bold text-[#0e2f4e] mb-8 text-center">Floor Plans</h3>
          {processedFloorplans.length > 0 ? (
            <div className="relative mx-auto max-w-5xl">
              <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden transition-all duration-700 transform hover:scale-105 shadow-lg">
                <iframe
                  src={processedFloorplans[activeFloorplanIndex] || placeholderIframe}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">No floor plans available</div>
          )}
        </section>

        {/* Brochure Button */}
        {pdf && (
          <div className="text-center mt-10 mb-20">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#f8bd0f] hover:bg-[#e5ad0e] text-[#0e2f4e] font-bold py-3 px-8 rounded-full transition-transform hover:scale-110 shadow-lg flex items-center justify-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Brochure</span>
            </button>
          </div>
        )}
      </div>

      {/* Bounce Animation CSS */}
      <style jsx>{`
        @keyframes bounce-custom {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25%);
          }
        }
        .animate-bounce-custom {
          animation: bounce-custom 2s infinite ease-in-out;
        }
      `}</style>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-[#0e2f4e]">Fill out the form to download the brochure</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-[#f8bd0f] text-[#0e2f4e] font-bold py-2 px-6 rounded-full hover:bg-[#e5ad0e] transition"
                >
                  Submit & View
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>  
      )}
    </div>
  );
};

export default AreaDetailComponent;
