import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2">
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end p-2">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }) => (
  <div className="border-b p-4">
    {children}
  </div>
);

export const ModalBody = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

export const ModalFooter = ({ children }) => (
  <div className="border-t p-4 flex justify-end">
    {children}
  </div>
);

export default Modal;
