import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import PropertyMap from "../component/propertyMap";
const PropertyDetailPage = () => {
  const { propertySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    // Check if we have the property data from navigation state
    if (location.state?.propertyData) {
      setProperty(location.state.propertyData);
      updateContactMessage(location.state.propertyData.house_name);
      setLoading(false);
    } else {
      // If not, fetch from the area endpoint and find the matching property
      const fetchProperty = async () => {
        try {
          // For direct navigation, assume downtown_dubai as default area
          const areaName = 'downtown_dubai';
          const formattedArea = areaName;

          const res = await axios.get(
            `/api/admin/properties/${formattedArea}`
          );

          // Find the property that matches the slug
          const foundProperty = res.data.find(
            (prop) =>
              prop.house_name.toLowerCase().replace(/\s+/g, "-") ===
              propertySlug
          );

          if (foundProperty) {
            setProperty(foundProperty);
            updateContactMessage(foundProperty.house_name);
          }
        } catch (err) {
          console.error("Error fetching property:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [propertySlug, location.state]);


  const updateContactMessage = (houseName) => {
    setFormData((prev) => ({
      ...prev,
      message: `I'm interested in ${houseName}. Please contact me with more information.`,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Compose WhatsApp message
      const message = `New Inquiry 📩%0A
  Name: ${formData.name}%0A
  Email: ${formData.email}%0A
  Phone: ${formData.phone}%0A
  Message: ${formData.message}%0A
  Property ID: ${property._id}`;

      // WhatsApp number format (without spaces or +)
      const whatsappNumber = "971585495683";

      // Open WhatsApp with the message
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

      // Simulate backend submission
      setTimeout(() => {
        setFormSuccess(true);
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e2f4e] mx-auto mb-4"></div>
          <p className="text-[#0e2f4e] text-xl font-semibold">
            Loading Property Details...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-[#0e2f4e] mb-4">
          Property Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We couldn't find the property you're looking for. It may have been
          removed or you might have followed an incorrect link.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#f8bd0f] text-[#0e2f4e] px-6 py-2 rounded-lg font-medium hover:bg-[#e0ad0e] transition duration-300"
        >
          Go Back to Listings
        </button>
      </div>
    );
  }

  // Calculate property amenities based on property data
  const amenities = [
    { icon: "🛏️", label: "Bedrooms", value: property.bedrooms || "N/A" },
    { icon: "🚿", label: "Bathrooms", value: property.bathrooms || "N/A" },
    {
      icon: "🏢",
      label: "Layout",
      value: property.area ? `${property.area} sqft` : "Modern & Open",
    },
    { icon: "🚗", label: "Parking", value: property.parking || "Available" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero section with property image */}
      <div className="relative h-96 md:h-[100vh] mb-8">
        <img
          src={property.imageurl || "/placeholder-property.jpg"}
          alt={property.house_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white mb-4 hover:underline bg-black/30 px-4 py-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to listings
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {property.house_name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="bg-[#f8bd0f] text-[#0e2f4e] px-3 py-1 rounded-full text-sm font-medium">
                {property.for}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {property.house_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Price and key details bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-wrap gap-6 justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Starting From</span>
            <div className="text-xl font-bold text-[#0e2f4e]">
              {property.price
                ? `AED ${property.price.toLocaleString()}`
                : "Inquire for price"}
            </div>
          </div>
          <div className="flex gap-10">
            {amenities.map((item, index) => (
              <div key={index} className="text-center">
                <span className="text-gray-500 text-sm">{item.label}</span>
                <div className="flex items-center justify-center gap-1 text-lg font-medium">
                  <span>{item.icon}</span> {item.value}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              document
                .getElementById("contact-form")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#0e2f4e] hover:bg-[#0a2338] text-white px-6 py-3 rounded-lg font-medium transition ml-auto"
          >
            Contact Agent
          </button>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h2 className="text-2xl font-bold text-[#0e2f4e] mb-4">
                Property Overview
              </h2>
              <div className="mb-10">
      {property.discription
        .split(".")
        .filter((line) => line.trim() !== "")
        .map((line, index) => {
          // Check if line contains a link format (with a colon followed by URL)
          const isLinkFormat = line.includes("http") && line.includes(":");
          
          if (isLinkFormat) {
            // Handle Type 2: heading : "some link"
            const [heading, url] = line.split(":");
            return (
              <p key={index} className="mb-2 flex items-center">
                <span className="text-blue-900 font-bold mr-2">• {heading.trim()}:</span>
                <a 
                  href={url.trim()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <ExternalLink size={16} className="mr-1" />
                  Visit Link
                </a>
              </p>
            );
          } else {
            // Handle Type 1: heading - description text
            const parts = line.split("–");
            const heading = parts[0].trim();
            const description = parts.length > 1 ? parts.slice(1).join("–").trim() : "";
            
            return (
              <p key={index} className="mb-2">
                <span className="text-blue-900 font-bold">• {heading}:</span>{" "}{description}.
              </p>
            );
          }
        })}
    </div>
              <p className="text-gray-700 leading-relaxed">
                {property.description ||
                  "This exclusive property offers modern living in a prime location. Contact us for more details about this exceptional opportunity."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h2 className="text-2xl font-bold text-[#0e2f4e] mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#0e2f4e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Property Type</span>
                    <p className="font-medium">{property.house_type}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#0e2f4e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Status</span>
                    <p className="font-medium">{property.for}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#0e2f4e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Location</span>
                    <p className="font-medium">{property.location}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#0e2f4e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Reference ID</span>
                    <p className="font-medium">
                      {property._id.substring(0, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-[#0e2f4e] mb-4">
                Location
              </h2>

              {/* Google Maps Container */}
              <PropertyMap property={property} />

              {/* Location details */}
              <div className="mt-4 flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#0e2f4e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Full Address</span>
                  <p className="font-medium">
                    {property.address ||
                      `${property.house_name},${property.location}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-1">
              <div
                id="contact-form"
                className="bg-white p-6 rounded-xl shadow-md sticky top-6"
              >
                <h2 className="text-xl font-bold text-[#0e2f4e] mb-4">
                  Contact Agent
                </h2>
  
                {formSuccess ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-green-500 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-semibold text-green-800 text-lg mb-1">
                      Request Received!
                    </h3>
                    <p className="text-green-700 mb-4">
                      We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setFormSuccess(false)}
                      className="text-[#0e2f4e] underline font-medium"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f] focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f] focus:border-transparent"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f] focus:border-transparent"
                        placeholder="+971 50 123 4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f] focus:border-transparent"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full ${
                          submitting
                            ? "bg-gray-400"
                            : "bg-[#0e2f4e] hover:bg-[#0a2338]"
                        } text-white py-3 rounded-lg font-medium transition flex items-center justify-center`}
                      >
                        {submitting ? (
                          <>
                            <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                            Sending...
                          </>
                        ) : (
                          "Send Inquiry"
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting this form, you agree to our privacy policy and
                      terms of service.
                    </p>
                  </form>
                )}
  
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-[#0e2f4e] mb-3">
                    Contact Directly
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0e2f4e]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">+971 0585495683</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#e9f0f7] rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0e2f4e]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      owner@empirekeyproperties.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
