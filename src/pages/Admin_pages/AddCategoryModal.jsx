import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';
import axiosClient from '../../api/axios';
import ImageCanvas from './ImageCanvas';
import Sidebar from './Sidebar';


const AddCategoryModal = ({ isOpen, closeModal, currentFolderId, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [formData, setFormData] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [segmentationZones, setSegmentationZones] = useState([]);
  const [currentZone, setCurrentZone] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [boxId, setBoxId] = useState(1);
  const [boxCategory, setBoxCategory] = useState({});
  const [imageScale, setImageScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveBoxesAndCategory = async () => {
    const boxesData = segmentationZones.map((zone) => ({
      id: zone.id,
      text: zone.text,
      x: zone.x,
      y: zone.y,
      width: zone.width,
      height: zone.height,
      category: zone.category,
      categoryId: currentFolderId, // Ensure categoryId is included
    }));
  
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('boxesData', JSON.stringify(boxesData));
      formData.append('categoryName', categoryName);
      formData.append('folderId', currentFolderId);
  
      try {
        const response = await axiosClient.post('/api/save-image-and-category', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Success:', response.data);
        handleAddCategory(currentFolderId, response.data.category);
        closeModal();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.error('Validation errors:', error.response.data.errors);
        } else {
          console.error('Error saving data:', error);
        }
      }
    });
  };
  

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const performOCR = (blob, zoneId) => {
    setIsLoading(true);
    Tesseract.recognize(
      blob,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setOcrText(text);
      setIsLoading(false);
      setSegmentationZones((prevZones) =>
        prevZones.map((zone) =>
          zone.id === zoneId ? { ...zone, text } : zone
        )
      );
    });
  };

  const handleCanvasMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / imageScale;
    const y = (e.clientY - rect.top) / imageScale;
    setCurrentZone({ id: boxId, x, y, width: 0, height: 0, category: '' });
    setIsDrawing(true);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / imageScale;
    const y = (e.clientY - rect.top) / imageScale;
    setCurrentZone((prevZone) => ({
      ...prevZone,
      width: x - prevZone.x,
      height: y - prevZone.y,
    }));
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing) {
      setSegmentationZones((prevZones) => [...prevZones, currentZone]);
      setIsDrawing(false);
      setBoxId((prevId) => prevId + 1);
    }
  };

  const handleScanZone = (zone) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { x, y, width, height } = zone;
    const imageData = ctx.getImageData(x * imageScale, y * imageScale, width * imageScale, height * imageScale);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width * imageScale;
    tempCanvas.height = height * imageScale;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    tempCanvas.toBlob((blob) => {
      performOCR(blob, zone.id);
    });
  };

  const handleDeleteZone = (id) => {
    setSegmentationZones((prevZones) => prevZones.filter((zone) => zone.id !== id));
    setBoxCategory((prevCategory) => {
      const newCategory = { ...prevCategory };
      delete newCategory[id];
      return newCategory;
    });
  };

  const handleBoxCategoryChange = (id, category) => {
    setSegmentationZones((prevZones) =>
      prevZones.map((zone) =>
        zone.id === id ? { ...zone, category } : zone
      )
    );
    setBoxCategory((prevCategory) => ({
      ...prevCategory,
      [id]: category,
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setSegmentationZones([]);
      setUploadedImage(null);
      setOcrText('');
      setBoxId(1);
      setIsDrawing(false);
      setBoxCategory({});
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Category
                </Dialog.Title>
                <div className="mt-4 flex space-x-4">
                  <div className="w-3/4">
                    <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop an image here, or click to select one</p>
                    </div>
                    {uploadedImage && (
                      <ImageCanvas
                        canvasRef={canvasRef}
                        uploadedImage={uploadedImage}
                        segmentationZones={segmentationZones}
                        handleCanvasMouseDown={handleCanvasMouseDown}
                        handleCanvasMouseMove={handleCanvasMouseMove}
                        handleCanvasMouseUp={handleCanvasMouseUp}
                        isDrawing={isDrawing}
                        currentZone={currentZone}
                        imageScale={imageScale}
                        handleScanZone={handleScanZone}
                      />
                    )}
                    {ocrText && (
                      <div className="mt-4 bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto">
                        <h4 className="text-lg font-medium text-gray-900">Extracted Text:</h4>
                        <pre>{ocrText}</pre>
                      </div>
                    )}
                    {isLoading && <div className="mt-4">Processing OCR...</div>}
                  </div>
                  <Sidebar
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    segmentationZones={segmentationZones}
                    boxCategory={boxCategory}
                    handleBoxCategoryChange={handleBoxCategoryChange}
                    handleScanZone={handleScanZone}
                    handleDeleteZone={handleDeleteZone}
                    imageScale={imageScale}
                    setImageScale={setImageScale}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    onClick={handleSaveBoxesAndCategory}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={closeModal}
                    className="ml-2 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  >
                    Close
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddCategoryModal;
