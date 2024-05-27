import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ImageModal = ({ isOpen, onClose, selectedImage }) => {
  if (!isOpen || !selectedImage) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 max-w-3xl w-full max-h-full overflow-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
          <IoMdClose className="h-6 w-6" />
        </button>
        <div className="flex justify-center items-center">
          <img src={`http://localhost:8000/${selectedImage.path}`} alt={`Page ${selectedImage.page_number}`} className="max-w-full max-h-[80vh]" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
