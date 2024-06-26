import React, { useState, useEffect, useRef } from "react";
import { Upload, X } from "react-feather";
import axiosClient from "../../api/axios";
import DocumentsPage from "./homePageClient/DocumentsPage";
import FolderManagementPage from "./FolderManagementClient/FolderManagement";
import { Button } from "@/components/ui/button";
import { useUserContext } from "../../context/ClientContext"; // Ensure correct path

const FileManagement = () => {
  const { user } = useUserContext(); // Use the context to get user info
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axiosClient.get("/api/folders");
        setFolders(response.data);
      } catch (error) {
        console.error("Error fetching folders:", error.response);
      }
    };

    fetchFolders();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFolderId) {
      alert("Please select a folder before uploading.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`pdf_file[${index}]`, file);
    });

    try {
      const response = await axiosClient.post(
        `/api/upload?folder_id=${selectedFolderId}&user_id=${user.id}`, // Include user_id
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      console.error("Error details:", error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-8">
        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg p-6 ">
          <div className="flex items-center justify-center mb-4">
            <Upload
              className="w-8 h-8 text-gray-500 cursor-pointer"
              onClick={handleUploadClick}
            />
          </div>
          <h2 className="text-lg font-semibold text-center mb-4">
            Choose Files
          </h2>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          />
          <div className="flex items-center justify-center ">
            <Button
              onClick={handleUpload}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 "
            >
              Upload
            </Button>
          </div>
        </div>
        <div className="w-1/2 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Selected Files</h2>
          <div className="container mx-auto p-4 rounded-lg ">
            <FolderManagementPage />
          </div>
          <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-40">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-white rounded-md p-2"
              >
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="folderSelect" className="block font-semibold mb-1">
              Select Folder:
            </label>
            <select
              id="folderSelect"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedFolderId}
              onChange={(e) => setSelectedFolderId(e.target.value)}
            >
              <option value="">Select folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <DocumentsPage />
    </div>
  );
};

export default FileManagement;
