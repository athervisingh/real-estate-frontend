import React from 'react';
import { Home, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 text-lg">
        No results found.
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 max-w-7xl mx-auto mb-20">
      <h1 className="text-4xl font-bold text-[#0e2f4e] mb-20 text-center">
         <span className="text-[#f8bd0f]">Search</span> Results
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.map((item, idx) => (
          <Link
            to="/contact"
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group block"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.imageurl || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={item.house_name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 bg-[#f8bd0f] text-[0e2f4e] text-xs px-2 py-1 rounded-full uppercase">
                {item.for}
              </span>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#0e2f4e] break-words whitespace-normal flex items-center gap-1">
             {item.house_name}
              </h2>

              <p className="text-sm text-gray-600 mt-2 flex items-center gap-1 break-words whitespace-normal">
                <Tag size={14} /> {item.house_type}
              </p>

              {item.discription && (
                <p className="text-xs text-gray-500 mt-2 italic break-words whitespace-normal">
                  {item.discription}
                </p>
              )}

              <div className="mt-4 flex justify-between items-center">
                <span className="text-[#f8bd0f] font-bold text-lg">
                  AED {item.price?.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
