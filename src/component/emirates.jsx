import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Emirates() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/homepage/cities`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        setCities(data);
      } catch (error) {
        console.error("Failed to load cities", error);
        setError("Unable to load cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);

  const handleCardClick = (cityName) => {
    const formattedName = cityName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedName}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-[#0e2f4e] animate-spin"></div>
          <p className="mt-4 text-[#0e2f4e] font-medium">Loading cities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-50 rounded-lg mx-auto max-w-2xl">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-[#0e2f4e] text-white rounded hover:bg-[#1a4568] transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-[1400px] mt-20 mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-36">
        <h4 className="text-[#0e2f4e]/80 font-medium mb-2">DISCOVER UAE</h4>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0e2f4e] mb-6">
          Explore Magnificent Cities
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-[#0e2f4e] to-blue-400 mx-auto rounded"></div>
        <p className="max-w-2xl mx-auto mt-6 text-gray-600">
          Experience the unique charm and luxury of each Emirates city, from the iconic skylines to the rich cultural heritage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cities.map(city => (
          <div
            key={city._id}
            onClick={() => handleCardClick(city.name)}
            className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="overflow-hidden h-60 relative">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f4e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="px-3 py-1 bg-white text-[#0e2f4e] text-sm font-medium rounded-full">Explore</span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#0e2f4e] mb-3 group-hover:text-blue-600 transition-colors duration-300">{city.name.replaceAll("-"," ")}</h2>
              <p className="text-gray-600 line-clamp-3">{city.text}</p>
            </div>
            
            <div className="px-6 pb-6 pt-0 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                UAE
              </div>
              <div className="text-sm text-[#0e2f4e] font-medium group-hover:underline">View Details</div>
            </div>
          </div>
        ))}
      </div>
      
      {cities.length === 0 && !loading && !error && (
        <div className="text-center py-10">
          <p className="text-gray-500">No cities available at the moment.</p>
        </div>
      )}
    </section>
  );
}