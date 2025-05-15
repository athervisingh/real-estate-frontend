import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AreaDetailComponent from "../component/areaDetailComponent";
const AreaPage = () => {
  const { cityName , areaName } = useParams();
  const formattedCityName = cityName.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  const formattedArea = areaName.replace(/-/g, "_");
  const [properties, setProperties] = useState([]);
  const [area , setArea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
   const propertiesPerPage = 6;
  const navigate = useNavigate();

  const images = ["/L1.jpg", "/L2.jpg", "/L3.jpg", "/L4.jpg", "/L5.jpg", "/L6.jpg", "/L7.jpg", "/L8.jpg"];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/admin/properties/${formattedArea}`);
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [formattedArea]);


  useEffect(() => {
    const fetchAreaDetails = async () => {
      try {
        console.log(formattedCityName+formattedArea)
        // Make API request using both cityName and areaName
        const res = await axios.get(`http://localhost:3002/api/admin/properties/${formattedCityName}/${formattedArea}`);
        setArea(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreaDetails();
  }, [formattedCityName, formattedArea]);

  // Image carousel controls
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handleViewProperty = (property) => {
    const propertySlug = property.house_name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/property/${propertySlug}`, { state: { propertyData: property } });
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
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
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#f1f1ec] to-[#eeead5] mt-20">
      {/* Image Carousel - Improved version */}
      <div className="relative w-full overflow-hidden h-[100vh]">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`/images${img}`}
              alt={`Area image ${index + 1}`}
              className="w-full h-full object-center"
              onError={(e) => {
                console.error(`Failed to load image: ${img}`);
                e.target.src = "/placeholder-property.jpg";
              }}
            />
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 bg-gradient-to-b from-transparent via-black/20 to-black/40">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold capitalize drop-shadow-lg">
              Explore {formattedArea.replace(/_/g, " ")}
            </h1>
            <p className="text-lg md:text-xl mt-2 opacity-90 drop-shadow-md">
              Find homes that match your lifestyle, right here.
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e2f4e] mb-2">
            Top Picks in {formattedArea.toUpperCase().replace(/_/g, " ")}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Dive into our handpicked collection of residential properties — verified, beautifully crafted, and perfectly located.
          </p>
        </div>


        <div className="max-w-7xl mx-auto">
      {area && Object.keys(area).length > 0 && <AreaDetailComponent areaData={area} />}
    </div>
    <h2 className="text-3xl underline md:text-4xl font-bold text-[#0e2f4e] mt-20 mb-20 text-center">
            Top Properties in {formattedArea.toUpperCase().replace(/_/g, " ")}
          </h2>
        {/* Properties */}
        {properties.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No properties found.</p>
        ) : (
          <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
             {currentProperties.map((property) => (
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
                    <span className="bg-[#f8bd0f] text-[#0e2f4e] px-3 py-1 rounded-full text-sm font-medium">
                      {property.house_type}
                    </span>
                    {/* <p className="text-sm text-gray-600 line-clamp-2">
                      {property.discription}
                    </p> */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-lg font-bold text-[#0e2f4e]">
                        Location — {property.location?.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleViewProperty(property)}
                        className="bg-[#0e2f4e] hover:bg-[#0a2338] text-white px-4 py-2 rounded-lg flex items-center gap-1"
                      >
                        <span>View</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
           <div className="flex justify-center items-center gap-6 mb-10 mt-14 text-[#0e2f4e]">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`p-3 rounded-full border border-[#0e2f4e] ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0a2338] hover:text-white"
                }`}
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-full border border-[#0e2f4e] ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0a2338] hover:text-white"
                }`}
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
          
        )}
      </div>
    </div>
  );
};

export default AreaPage;