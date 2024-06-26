import React, { useState, useEffect } from "react";
import { FaFileAlt, FaFolder } from "react-icons/fa";
import axiosClient from "../../../api/axios";
import ModuleIAManagement from "../ModuleIAManagement";
import { FadeLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDocumentScanner } from "react-icons/md";

const Client_Folders = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [folderFiles, setFolderFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10);
  const [images, setImages] = useState([]);

  const handleFolderClick = async (folder) => {
    try {
      const response = await axiosClient.get(`/api/folders/${folder.id}/files`);
      setFolderFiles(response.data.files);
      setSelectedFile(null);
      setSelectedFolder(folder);
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };

  const handleFileClick = async (file) => {
    try {
      const response = await axiosClient.get(`/api/pdf_files/${file.id}/path`);
      const headers = {
        'Access-Control-Allow-Origin': import.meta.env.VITE_FRONTEND_URL,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };
      setSelectedFile({ ...file, filePath: response.data.filePath, headers });

      // Fetch images for the selected file
      const imagesResponse = await axiosClient.get(`/api/images/${file.id}`);
      setImages(imagesResponse.data);
    } catch (error) {
      console.error("Error fetching file path or images:", error);
    }
  };

  const handleCancelClick = () => {
    setSelectedFile(null);
    setImages([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/api/folders");
        setFolders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = folderFiles.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="gray" size={150} />
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      <div className="flex flex-wrap gap-8">
        {folders.map((folder) => (
          <div key={folder.id} className="flex flex-col items-center">
            <FaFolder
              className="text-4xl text-gray-600 mb-2 cursor-pointer"
              onClick={() => handleFolderClick(folder)}
            />
            <span className="text-sm">{folder.name}</span>
          </div>
        ))}
      </div>

      {selectedFolder && folderFiles && folderFiles.length > 0 && folderFiles.some(pdfFile => pdfFile.folder_id === selectedFolder.id) && (
        <div className="grid grid-cols-3 gap-4">
          {currentFiles.map((pdf_file) => {
            if (pdf_file.folder_id === selectedFolder.id) {
              return (
                <div
                  key={pdf_file.id}
                  className="bg-gray-100 p-4 rounded-lg text-center cursor-pointer"
                  onClick={() => handleFileClick(pdf_file)}
                >
                  <FaFileAlt className="text-4xl text-gray-600 mb-2 mx-auto" />
                  <span className="text-sm">{pdf_file.filename}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {folderFiles.length > filesPerPage && (
        <nav className="mt-4">
          <ul className="flex justify-center">
            {Array.from({ length: Math.ceil(folderFiles.length / filesPerPage) }).map((_, index) => (
              <li key={index} className="mr-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:bg-gray-300 ${
                    currentPage === index + 1 ? "bg-gray-300" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="bg-white p-8">
        <form>
          {selectedFile && selectedFile.filePath && (
            <>
              <div className="bg-white p-8 flex justify-end">
                <IoMdClose
                  className="hover:text-gray-500 cursor-pointer"
                  onClick={handleCancelClick}
                />
              </div>
              <button className="p-2 bg-gray-800 text-white rounded shadow-md mr-2 hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center m-2">
                <MdOutlineDocumentScanner className="mr-2" />
                <span>IA Vrifications</span>
              </button>
              <ModuleIAManagement filePath={selectedFile.filePath} headers={selectedFile.headers} images={images} />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Client_Folders;
