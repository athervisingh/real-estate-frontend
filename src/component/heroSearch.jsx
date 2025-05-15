import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSearchResults, setLoading, setError } from '../store/searchSlice'; // adjust path if needed
export default function ThemedRealEstateSearch() {
  const [activeTab, setActiveTab] = useState('Buy');
  const [location, setLocation] = useState('');
  const [isResidentialOpen, setIsResidentialOpen] = useState(false);
  const [isBedsOpen, setIsBedsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [residential, setResidential] = useState('Residential');
  const [beds, setBeds] = useState('Beds');
  const [price, setPrice] = useState('Price');

  const dispatch = useDispatch();
  

  const primaryColor = '#f8bd0f'; // Golden yellow
  const secondaryColor = '#0e2f4e'; // Dark navy blue


  const handleSearch = async () => {
    const searchParams = {
      purpose: activeTab,
      location,
      residential,
      beds,
      price,
    };
  
    console.log(searchParams);
    dispatch(setLoading(true));
    try {
      const response = await axios.post('http://localhost:3002/api/search/result', searchParams);
      dispatch(setSearchResults(response.data));
      console.log(response.data);
    } catch (error) {
      dispatch(setError(error.message));
      console.error('Search failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  const residentialOptions = ['Apartment', 'Villa', 'Townhouse', 'Commercial', 'Land'];
  const bedsOptions = ['Studio', '1', '2', '3', '4', '5+'];
  const priceOptions = activeTab === 'Buy'
    ? ['Any', 'Under $500K', '$500K-1M', '$1M-2M', '$2M+']
    : ['Any', 'Under $1K', '$1K-2K', '$2K-5K', '$5K+'];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-md shadow-md border border-gray-200">
        <div className="p-4">
          {/* Buy/Rent Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-6 py-3 font-medium transition-colors"
              style={{
                color: activeTab === 'Buy' ? secondaryColor : '',
                borderBottom: activeTab === 'Buy' ? `2px solid ${primaryColor}` : ''
              }}
              onClick={() => setActiveTab('Buy')}
            >
              Buy
            </button>
            <button
              className="px-6 py-3 font-medium transition-colors"
              style={{
                color: activeTab === 'Rent' ? secondaryColor : '',
                borderBottom: activeTab === 'Rent' ? `2px solid ${primaryColor}` : ''
              }}
              onClick={() => setActiveTab('Rent')}
            >
              Rent
            </button>
          </div>

          {/* Responsive Search Fields */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Location Input */}
            <div className="flex-grow w-full">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-1"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div className="px-3 text-gray-500" style={{ color: secondaryColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-2 px-2 outline-none"
                  style={{ color: secondaryColor }}
                />
              </div>
            </div>

            {/* Residential Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                className="w-full md:w-36 flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md hover:border-gray-400"
                style={{ color: secondaryColor }}
                onClick={() => {
                  setIsResidentialOpen(!isResidentialOpen);
                  setIsBedsOpen(false);
                  setIsPriceOpen(false);
                }}
              >
                <span className="truncate">{residential}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                  className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isResidentialOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {residentialOptions.map(option => (
                    <div key={option}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      style={{ color: secondaryColor }}
                      onClick={() => {
                        setResidential(option);
                        setIsResidentialOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Beds Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                className="w-full md:w-24 flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md hover:border-gray-400"
                style={{ color: secondaryColor }}
                onClick={() => {
                  setIsBedsOpen(!isBedsOpen);
                  setIsResidentialOpen(false);
                  setIsPriceOpen(false);
                }}
              >
                <span>{beds}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                  className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isBedsOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {bedsOptions.map(option => (
                    <div key={option}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      style={{ color: secondaryColor }}
                      onClick={() => {
                        setBeds(option);
                        setIsBedsOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                className="w-full md:w-36 flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md hover:border-gray-400"
                style={{ color: secondaryColor }}
                onClick={() => {
                  setIsPriceOpen(!isPriceOpen);
                  setIsResidentialOpen(false);
                  setIsBedsOpen(false);
                }}
              >
                <span>{price}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                  className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isPriceOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {priceOptions.map(option => (
                    <div key={option}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      style={{ color: secondaryColor }}
                      onClick={() => {
                        setPrice(option);
                        setIsPriceOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto">
              <button
                className="w-full md:w-auto text-white font-medium py-2 px-6 rounded-md transition duration-200"
                style={{ backgroundColor: primaryColor, color: secondaryColor }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
