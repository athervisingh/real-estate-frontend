import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Emiratepages = () => {
  const { cityName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const properCityName = cityName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const CityName = cityName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Define images array for carousel
  const images = [
    "/L1.jpg",
    "/L2.jpg",
    "/L3.jpg",
    "/L4.jpg",
    "/L5.jpg",
    "/L6.jpg",
    "/L7.jpg",
    "/L8.jpg",
  ];

  // Image carousel controls - automatic rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/api/admin/fetch-city-data?city=${properCityName}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch city data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [properCityName]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-[#0f304e] text-xl font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Hero Section with Carousel */}
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
              alt={`${CityName} image ${index + 1}`}
              className="w-full h-full object-center"
              onError={(e) => {
                console.error(`Failed to load image: ${img}`);
                e.target.src = "/placeholder-property.jpg";
              }}
            />
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
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
          <h1 className="text-5xl text-white font-bold drop-shadow-lg">
            {CityName}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-10 mt-10 bg-gradient-to-b from-white to-[#f8bd0f]/20">
        <h2 className="text-4xl font-bold text-center text-[#0f304e] mb-8">
          Discover <span className="text-[#f8bd0f]">{properCityName}</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Discover a lifestyle defined by elegance, comfort, and sophistication
          in{" "}
          <span className="text-[#0f304e] font-medium">{properCityName}</span>.
          From stylish residences to serene surroundings, each property offers a
          perfect blend of modern living and timeless charm in one of the
          region’s most desirable destinations.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((doc) => {
            const areaSlug = doc.name.toLowerCase().replace(/\s+/g, "-"); // e.g., "Area 1" → "area-1"
            return (
              <Link
                to={`/${cityName}/${areaSlug}`}
                key={doc._id}
                className="bg-white/70 backdrop-blur-md border border-[#f8bd0f]/40 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out overflow-hidden"
              >
                <img
                  src={doc.imageURL}
                  alt={doc.name}
                  className="h-52 w-full object-cover rounded-t-3xl"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-[#0f304e] mb-2 truncate">
                    {doc.name}
                  </h2>
                  <p className="text-gray-700 text-sm h-20 overflow-hidden">
                    {doc.discription}
                  </p>
                  <button className="mt-4 w-full bg-[#f8bd0f] text-[#0f304e] py-2 rounded-xl font-semibold hover:bg-[#e0a700] transition">
                    Learn More
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Emiratepages;
