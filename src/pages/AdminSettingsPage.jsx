import React from 'react';
import { Settings } from 'react-feather';

const AdminSettings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="flex items-center gap-4">
          <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Edit Account Information</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Change Password</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Notification Preferences</p>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
        <div className="flex items-center gap-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Theme</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Font Size</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Language</p>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
        <div className="flex items-center gap-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Data Sharing</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
        <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Public Profile</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Settings className="h-8 w-8 text-gray-600" />
          <p className="text-lg text-gray-800">Clear History</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
