import React, { useState, useEffect, useRef } from "react";
import { FiFolder, FiFile } from "react-icons/fi"; // Import icons for folders and files
import { FaBackspace, FaFileUpload } from "react-icons/fa";
import axiosClient from "../../../api/axios";

const FolderManagementPage = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await axiosClient.get("/api/folders");
      if (Array.isArray(response.data)) {
        setFolders(response.data);
        setLoading(false);
      } else {
        throw new Error("Folders data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      setError("Error fetching folders. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddFolder = async () => {
    try {
      const response = await axiosClient.post("/api/folders", {
        name: newFolderName,
      });
      // Mark the folder as created by the client
      response.data.createdByClient = true;
      setFolders([...folders, response.data]);
      setNewFolderName("");
    } catch (error) {
      console.error("Error adding folder:", error);
      setError("Error adding folder. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUploadFile = async () => {
    if (!selectedFolder || selectedFiles.length === 0) {
      console.error("Please select a folder and choose a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`pdf_files[${index}]`, file);
      });

      await axiosClient.post(`/api/folders/${selectedFolder.id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh the folder after uploading the file
      fetchFolders();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`pdf_files[${index}]`, file);
    });

    try {
      const response = await axiosClient.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Assuming your backend responds with some data

      // Clear selected files
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      console.error("Error details:", error.response.data); // Log the error details from the server
    }
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className=" bg-gray-100 "
        style={{
          
          width: "100%",
          padding: "10px",
          
          borderRadius: "5px",
          
        }}
      >
        <h1
          style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}
        >
          Folder Management
        </h1>
        <div>
          <h2 style={{ marginBottom: "10px", color: "#333" }}>
            Create New Folder 
          </h2>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #e5e5e5",
              borderRadius: "3px",
            }}
            placeholder="Enter folder name"
          />
          <button
            className="bg-gray-600 hover:bg-gray-900 text-white px-4 py-2 rounded-md ml-2 shadow-md"
            onClick={handleAddFolder}
            style={{
              padding: "8px 12px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Add Folder
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default FolderManagementPage;
