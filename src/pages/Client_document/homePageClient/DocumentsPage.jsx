import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axios";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmationDialog from "../../Admin_pages/ClientManagementFolder/ConfirmationDialog";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import IAClassificationsButton from "./IAClassificationsButton";
const DocumentsPage = () => {
  const [pdf_files, setPdf_files] = useState([]);
  const [folderNames, setFolderNames] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [fileToDelete, setFileToDelete] = useState(null); // State to track file to delete

  useEffect(() => {
    const fetchPdf_files = async () => {
      try {
        const response = await axiosClient.get("/api/pdf_files");
        setPdf_files(response.data.documents);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching pdf_files:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPdf_files();
  }, []);

  useEffect(() => {
    const fetchFolderName = async (folderId) => {
      try {
        const response = await axiosClient.get(`/api/folders/${folderId}`);
        const folderName = response.data.name;
        setFolderNames((prevState) => ({
          ...prevState,
          [folderId]: folderName,
        }));
      } catch (error) {
        console.error("Error fetching folder name:", error);
        setFolderNames((prevState) => ({
          ...prevState,
          [folderId]: "Unknown Folder",
        }));
      }
    };

    // Fetch folder names for all PDF files
    pdf_files.forEach((pdf) => {
      fetchFolderName(pdf.folder_id);
    });
  }, [pdf_files]);

  const handleDeleteFile = async (id) => {
    try {
      await axiosClient.delete(`/api/pdf_files/${id}`);
      setPdf_files(pdf_files.filter((pdf) => pdf.id !== id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Function to handle file deletion confirmation
  const handleConfirmDelete = () => {
    if (fileToDelete) {
      handleDeleteFile(fileToDelete);
      setFileToDelete(null); // Reset fileToDelete state
    }
  };

  // Function to set file to delete and open confirmation dialog
  const handleOpenConfirmationDialog = (id) => {
    setFileToDelete(id);
  };

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = pdf_files.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Documents</h1>
      <IAClassificationsButton/>
      
      

      <div className="overflow-x-auto mt-4" >
      <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Folder Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Files Classifications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Uploaded
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200 ">
            {currentItems.map((Pdf) => (
              <tr key={Pdf.id}>
                <td className="px-6 py-4 whitespace-nowrap">{Pdf.id}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <FaFileAlt  className="mr-2 text-gray-700 " /> {Pdf.filename}
                </td>
                <td className="px-6 py-4 whitespace-nowrap items-center">
                 <div className="flex items-center"> <FaFolder className="mr-2 text-gray-700" /> {folderNames[Pdf.folder_id]} </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{Pdf.file_data}</td>
                <td className="px-6 py-4 whitespace-nowrap">{Pdf.updated_at}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenConfirmationDialog(Pdf.id)} // Open confirmation dialog on click
                    className="p-2 bg-gray-800 text-white rounded-full shadow-md mr-2 hover:bg-red-700 focus:ring-2"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <nav className="flex justify-center mt-4" aria-label="Pagination">
        <ul className="flex">
          {Array.from(
            { length: Math.ceil(pdf_files.length / itemsPerPage) },
            (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none ${
                    currentPage === i + 1
                      ? "bg-gray-200 text-gray-800"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
      {/* Confirmation Dialog */}
      {fileToDelete && (
        <ConfirmationDialog
          message="Are you sure you want to delete this file?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setFileToDelete(null)} // Reset fileToDelete state on cancel
        />
      )}
    </div>
  );
};

export default DocumentsPage;
