import React from 'react';
import { BarChart, PieChart } from 'react-feather';

const Analytics = () => {
  // Placeholder data for analytics
  const data = {
    users: 1500,
    sessions: 2000,
    bounceRate: 35,
    conversionRate: 12,
    devices: [
      { name: 'Desktop', value: 60 },
      { name: 'Mobile', value: 30 },
      { name: 'Tablet', value: 10 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics</h1>

      {/* General analytics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <BarChart className="h-12 w-12 text-gray-800 mr-4" />
          <div>
            <p className="text-xl font-semibold">Users</p>
            <p className="text-gray-600">{data.users} users</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <BarChart className="h-12 w-12 text-gray-800 mr-4" />
          <div>
            <p className="text-xl font-semibold">Sessions</p>
            <p className="text-gray-600">{data.sessions} sessions</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <PieChart className="h-12 w-12 text-gray-800 mr-4" />
          <div>
            <p className="text-xl font-semibold">Bounce Rate</p>
            <p className="text-gray-600">{data.bounceRate}%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <PieChart className="h-12 w-12 text-gray-800 mr-4" />
          <div>
            <p className="text-xl font-semibold">Conversion Rate</p>
            <p className="text-gray-600">{data.conversionRate}%</p>
          </div>
        </div>
      </div>

      {/* Devices analytics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Devices</h2>
        <div className="grid grid-cols-3 gap-4">
          {data.devices.map((device, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
              <p className="text-lg font-semibold">{device.value}%</p>
              <p className="text-gray-600 ml-2">{device.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
