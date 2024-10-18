import React, { useState } from 'react';

// Sample college data (replace this with actual data or fetch from API)
const colleges = [
  "Sardar Vallabhbhai National Institute of Technology",
  "Sathyabama Institute of Science and Technology",
  "Sikkim Manipal Institute of Technology",
  "SRM Institute of Science and Technology",
  "Silicon Institute of Technology",
  "Sri Venkateswara University",
  "Shivaji University",
  "Symbiosis Institute of Technology",
];

const CollegeSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Handle change in search input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = colleges.filter((college) =>
        college.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (college) => {
    setSearchTerm(college);
    setSuggestions([]);
  };

  // Handle search button click (you can customize what happens here)
  const handleSearchClick = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="relative w-72">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search colleges"
          value={searchTerm}
          onChange={handleInputChange}
          className="p-2 border rounded w-[500px]"
        />
        <button
          onClick={handleSearchClick}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md z-10">
          {suggestions.map((college, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(college)}
              className="p-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
            >
              {college}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollegeSearchBar;
