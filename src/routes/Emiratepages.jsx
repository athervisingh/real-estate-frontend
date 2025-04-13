import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Emiratepages = () => {
  const { cityName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomImage, setRandomImage] = useState("");

  const properCityName = cityName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    setRandomImage(`images/L${randomNumber}.jpg`);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/admin/fetch-city-data?city=${properCityName}`
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="w-full h-[60vh] sm:h-[70vh] bg-cover bg-center relative shadow-lg"
        style={{ backgroundImage: `url(${randomImage})` }}
      >
        <div className="absolute inset-0 bg-[#0f304e]/40 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold drop-shadow-lg">
            {properCityName}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-10 mt-10 bg-gradient-to-b from-white to-[#f8bd0f]/20">
        <h2 className="text-4xl font-bold text-center text-[#0f304e] mb-8">
          Discover <span className="text-[#f8bd0f]">{properCityName}</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Explore the handpicked highlights, scenic spots, and hidden gems of{" "}
          <span className="text-[#0f304e] font-medium">{properCityName}</span>. Each
          location is carefully curated to offer a rich glimpse into the vibrant
          culture, nature, and architecture of the emirate.
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
