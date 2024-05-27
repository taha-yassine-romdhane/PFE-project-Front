import React, { useState } from 'react';
import ImageModal from './ImageModal'; // Adjust the import path if necessary

const ModuleIAManagement = ({ filePath, headers, images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pages</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <button
            key={image.id}
            className="bg-white p-4 shadow-md rounded-lg text-center"
            onClick={(e) => {
              e.preventDefault();
              handleImageClick(image);
            }}
          >
            <span className="text-sm">Page {image.page_number}</span>
          </button>
        ))}
      </div>

      <ImageModal isOpen={!!selectedImage} onClose={closeModal} selectedImage={selectedImage} />
    </div>
  );
};

export default ModuleIAManagement;

