import React from 'react';

const TestSidebar = ({ categories = [], selectedCategory, setSelectedCategory, results }) => {
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4 rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-900">Test Results</h4>
        {results.map((result) => (
          <div key={result.zoneId} className="mb-2">
            <p className="font-semibold">Zone ID: {result.zoneId}</p>
            <p>Expected: {result.zoneText}</p>
            <p>Extracted: {result.extractedText}</p>
            <p>Match Percentage: {result.matchPercentage.toFixed(2)}%</p>
            <p
              className={
                result.isMatch ? 'text-green-600' : 'text-red-600'
              }
            >
              {result.isMatch ? 'Match' : 'Mismatch'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSidebar;
