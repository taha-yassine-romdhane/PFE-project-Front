import React, { useState, useRef, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";
import leven from "leven";
import ImageCanvas from "./ImageCanvas";
import TestSidebar from "./TestSidebar";
import axiosClient from "../../api/axios"; // Ensure you import axios client

const TestModal = ({ isOpen, closeModal }) => {
  const [testImage, setTestImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [results, setResults] = useState([]);
  const [segmentationZones, setSegmentationZones] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageScale, setImageScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const testCanvasRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      axiosClient
        .get("/api/categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [isOpen]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    axiosClient
      .get(`/api/boxes/${categoryId}`)
      .then((response) => {
        console.log("Fetched segmentation zones:", response.data);
        setSegmentationZones(response.data);
      })
      .catch((error) => {
        console.error("Error fetching segmentation zones:", error);
      });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setTestImage(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const performOCR = (blob, zone) => {
    return new Promise((resolve) => {
      Tesseract.recognize(blob, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        console.log(`OCR result for zone ${zone.id}: ${text}`);
        const matchPercentage = calculateMatchPercentage(zone.text, text);
        resolve({
          zoneId: zone.id,
          zoneText: zone.text,
          extractedText: text,
          matchPercentage,
          isMatch: matchPercentage >= 85,
        });
      });
    });
  };

  const calculateMatchPercentage = (expectedText, extractedText) => {
    const distance = leven(expectedText, extractedText);
    const maxLength = Math.max(expectedText.length, extractedText.length);
    return ((maxLength - distance) / maxLength) * 100;
  };

  const handleScanZone = (zone) => {
    const canvas = testCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { x, y, width, height } = zone;
    const imageData = ctx.getImageData(
      x * imageScale,
      y * imageScale,
      width * imageScale,
      height * imageScale
    );
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width * imageScale;
    tempCanvas.height = height * imageScale;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(imageData, 0, 0);
    return new Promise((resolve) => {
      tempCanvas.toBlob((blob) => {
        console.log(`Scanning zone ${zone.id} with blob size: ${blob.size}`);
        performOCR(blob, zone).then(resolve);
      });
    });
  };

  const addCategorySegmentations = () => {
    console.log("addCategorySegmentations called");
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    if (testCanvasRef.current && testImage) {
      const ctx = testCanvasRef.current.getContext("2d");
      const img = new Image();
      img.src = testImage;
      img.onload = () => {
        ctx.clearRect(
          0,
          0,
          testCanvasRef.current.width,
          testCanvasRef.current.height
        );
        ctx.drawImage(
          img,
          0,
          0,
          img.width * imageScale,
          img.height * imageScale
        );

        // Draw existing zones
        segmentationZones.forEach((zone) => {
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            zone.x * imageScale,
            zone.y * imageScale,
            zone.width * imageScale,
            zone.height * imageScale
          );
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          ctx.fillRect(
            zone.x * imageScale,
            zone.y * imageScale,
            zone.width * imageScale,
            zone.height * imageScale
          );
        });
      };
    }
  };

  const scanOCR = async () => {
    console.log("scanOCR called");
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    setIsLoading(true);
    const promises = segmentationZones.map(handleScanZone);
    const results = await Promise.all(promises);
    console.log("OCR results:", results);
    setResults(results);
    setIsLoading(false);
  };

  const testImageClassification = () => {
    console.log("testImageClassification called");
    console.log("Selected Category:", selectedCategory);
    console.log("All Segmentation Zones:", segmentationZones);

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    const selectedZones = segmentationZones.filter(
      (zone) => zone.categoryId === selectedCategory
    );

    console.log("Filtered Selected Zones:", selectedZones);
    // Here you can add additional logic for testing image classification if needed
  };

  useEffect(() => {
    if (!isOpen) {
      setTestImage(null);
      setSelectedCategory("");
      setResults([]);
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Test Image Classification
                </Dialog.Title>
                <div className="mt-4 flex space-x-4">
                  <div className="w-3/4">
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center mb-4"
                    >
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop an image here, or click to select one</p>
                    </div>
                    {testImage && (
                      <ImageCanvas
                        canvasRef={testCanvasRef}
                        uploadedImage={testImage}
                        segmentationZones={segmentationZones}
                        imageScale={imageScale}
                      />
                    )}
                    {isLoading && <div className="mt-4">Processing OCR...</div>}
                    {results.length > 0 && (
                      <div className="mt-4 bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto">
                        <h4 className="text-lg font-medium text-gray-900">
                          OCR Results:
                        </h4>
                        <pre>{JSON.stringify(results, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                  <TestSidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={handleCategoryChange}
                    results={results}
                  />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    type="button"
                    onClick={addCategorySegmentations}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Add Category Segmentations
                  </Button>
                  <Button
                    type="button"
                    onClick={scanOCR}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Scan OCR
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      addCategorySegmentations();
                      scanOCR();
                      testImageClassification();
                    }}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Test Image
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

export default TestModal;
