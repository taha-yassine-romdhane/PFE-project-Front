import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaFolder } from "react-icons/fa"; // Import icons for files and folders
import axiosClient from "../../../api/axios";
import ModuleIAManagement from "../../ModuleIAManagement";
import { FadeLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";

const Client_Folders = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [folderFiles, setFolderFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10); // Set the number of files per page

  const handleFolderClick = async (folder) => {
    try {
      const response = await axiosClient.get(`/api/folders/${folder.id}/files`);
      const responsee = await axiosClient.get(`/api/folders/${folder.id}/files`);
      setFolderFiles(response.data.files);
      setSelectedFile(null);
      setSelectedFolder(folder);
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };
  

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleCancelClick = () => {
    setSelectedFile(null);
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

  // Get current files
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = folderFiles.slice(indexOfFirstFile, indexOfLastFile);

  // Change page
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
          {selectedFile && (
            <>
              <div className="bg-white p-8 flex justify-end">
                <IoMdClose
                  className="hover:text-gray-500 cursor-pointer"
                  onClick={handleCancelClick}
                />
              </div>
              <ModuleIAManagement selectedFile={selectedFile} />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Client_Folders;
