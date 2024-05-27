import React from 'react';
import { XCircle } from 'lucide-react';
import DynamicFormFields from './DynamicFormFields';

const Sidebar = ({
  categoryName,
  setCategoryName,
  formData,
  handleInputChange,
  segmentationZones,
  boxCategory,
  handleBoxCategoryChange,
  handleScanZone,
  handleDeleteZone,
  imageScale,
  setImageScale,
}) => {
  return (
    <div className="w-1/4 flex flex-col space-y-4">
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <DynamicFormFields handleInputChange={handleInputChange} />
      </form>
      {segmentationZones.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900">Segmentation Zones</h4>
          {segmentationZones.map((zone) => (
            <div key={zone.id} className="mb-2">
              <span className="font-semibold">ID: {zone.id}</span>
              <div className="flex items-center">
                <select
                  value={boxCategory[zone.id] || ''}
                  onChange={(e) => handleBoxCategoryChange(zone.id, e.target.value)}
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 mr-2"
                >
                  <option value="">Select Category Type</option>
                  <option value="title">Title</option>
                  <option value="subtitle">Subtitle</option>
                  <option value="date">Date</option>
                  <option value="adresse">Adresse</option>
                  <option value="phone">phone</option>
                  <option value="email">Email</option> 
                  <option value="signature">Signature</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleScanZone(zone)}
                  className="bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700"
                >
                  Scan
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteZone(zone.id)}
                  className="ml-2 text-gray-800 hover:text-red-700"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
   
    </div>
  );
};

export default Sidebar;
