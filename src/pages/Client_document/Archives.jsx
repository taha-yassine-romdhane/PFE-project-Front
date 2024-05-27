import React from "react";

const Archives = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Archives</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Archive Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Size
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date Archived
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example archive entries */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Archive 1</td>
              <td className="px-6 py-4 whitespace-nowrap">3.2 GB</td>
              <td className="px-6 py-4 whitespace-nowrap">April 8, 2024</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Archive 2</td>
              <td className="px-6 py-4 whitespace-nowrap">4.5 GB</td>
              <td className="px-6 py-4 whitespace-nowrap">April 7, 2024</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">
                  Download
                </button>
              </td>
            </tr>
            {/* Add more rows for additional archives */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Archives;
