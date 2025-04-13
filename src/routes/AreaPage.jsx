import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AreaPage = () => {
  const { areaName } = useParams();
  const formattedArea = areaName.replace(/-/g, "_");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const images = ["/L1.jpg", "/L2.jpg", "/L3.jpg", "/L4.jpeg", "/L5.jpg", "/L6.jpg", "/L7.jpg", "/L8.jpg"];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`/api/admin/properties/${formattedArea}`);
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [formattedArea]);

  const handleViewProperty = (property) => {
    const propertySlug = property.house_name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/property/${propertySlug}`, { state: { propertyData: property } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-[#0e2f4e] text-xl font-semibold animate-pulse">
          Loading Properties...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
     {/* Image Carousel */}
<div className="relative w-full overflow-hidden h-[300px] md:h-[450px] bg-black">
  <div className="flex animate-slideX w-[500%] h-full">
    {images.map((img, index) => (
      <div key={index} className="w-full flex-shrink-0 h-full">
        <img
          src={'/images/' + img}
          alt={`Slide ${index + 1}`}
          className="w-[100vw] h-[51vh]"
        />
      </div>
    ))}
  </div>
  <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 bg-black/40">
    <div>
      <h1 className="text-3xl md:text-5xl font-extrabold capitalize drop-shadow">
        Explore {formattedArea.replace(/_/g, " ")}
      </h1>
      <p className="text-lg md:text-xl mt-2 opacity-90">
        Find homes that match your lifestyle, right here.
      </p>
    </div>
  </div>
</div>


      {/* Info */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e2f4e] mb-2">
            Top Picks in {formattedArea.replace(/_/g, " ")}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Dive into our handpicked collection of residential properties — verified, beautifully crafted, and perfectly located.
          </p>
        </div>

        {/* Properties */}
        {properties.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No properties found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-52">
                  <img
                    src={property.imageurl || "/placeholder-property.jpg"}
                    alt={property.house_name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-[#f8bd0f] text-[#0e2f4e] font-semibold px-3 py-1 rounded-full text-xs">
                    {property.for}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-[#0e2f4e]">
                    {property.house_name}
                  </h3>
                  <span className="bg-gray-100 text-[#0e2f4e] px-3 py-1 rounded-full text-sm font-medium">
                    {property.house_type}
                  </span>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {property.discription}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-lg font-bold text-[#0e2f4e]">
                      AED {property.price?.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleViewProperty(property)}
                      className="bg-[#0e2f4e] hover:bg-[#0a2338] text-white px-4 py-2 rounded-lg flex items-center gap-1"
                    >
                      <span>View</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaPage;
