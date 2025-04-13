import { useState } from 'react';

export default function ResidentialDropdown() {
  const [activeCategory, setActiveCategory] = useState('Residential');
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  // Property type options by category
  const options = {
    Residential: ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Villa Compound', 'Hotel Apartment', 'Residential Plot', 'Residential Floor', 'Residential Building'],
    Commercial: ['Office', 'Shop', 'Warehouse', 'Labour Camp', 'Commercial Villa', 'Bulk Units', 'Commercial Plot', 'Commercial Building', 'Factory']
  };
  
  const handleToggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  
  const handleReset = () => {
    setSelectedOptions([]);
  };
  
  const handleDone = () => {
    console.log('Selected options:', selectedOptions);
    // Here you would typically close the dropdown and update parent component
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-200 overflow-y-auto overflow-x-auto">
      {/* Category tabs */}
      <div className="flex border-b border-gray-200">
        {Object.keys(options).map(category => (
          <button 
            key={category}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeCategory === category 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Options grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {options[activeCategory].map(option => (
            <button
              key={option}
              className={`py-2 px-4 rounded-full border transition-colors text-center ${
                selectedOptions.includes(option)
                  ? 'bg-green-50 border-green-600 text-green-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
              onClick={() => handleToggleOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex p-4 border-t border-gray-200">
        <button 
          className="flex-1 py-2 mr-2 border border-teal-800 text-teal-800 rounded font-medium"
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          className="flex-1 py-2 ml-2 bg-teal-800 text-white rounded font-medium"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}