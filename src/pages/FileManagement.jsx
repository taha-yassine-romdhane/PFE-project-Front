import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X } from 'react-feather';

const FileManagement = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">File Management</h1>

      {/* Upload section */}
      <div className="flex items-center mb-6">
        <Upload className="h-6 w-6 mr-2 text-gray-600" />
        <input type="file" onChange={handleFileChange} multiple className="hidden" />
        <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:underline">Upload Files</label>
      </div>

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Selected Files</h2>
          <ul className="list-disc pl-6">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-gray-800">{file.name}</span>
                <button onClick={() => handleRemoveFile(file)}>
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div>
        <Link to="/dashboard" className="text-blue-500 hover:underline">Go back to Dashboard</Link>
      </div>
    </div>
  );
};

export default FileManagement;

