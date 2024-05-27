import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axios";
import { Button } from "@/components/ui/button";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "@/components/ui/Modal"; 
import { FaFolder, FaCog } from "react-icons/fa"; 
import { useUserContext } from "../../../context/ClientContext"; 

const FolderManagementPage = () => {
  const { user, authenticated, checkAuth } = useUserContext();
  const [folders, setFolders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderCategory, setNewFolderCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFolders();
    fetchCategories();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await axiosClient.get("/api/folders");
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddFolder = async () => {
    try {
      console.log("Authenticated:", authenticated);
      console.log("User:", user);

      const response = await axiosClient.post("/api/folders", {
        name: newFolderName,
        category: newFolderCategory,
        user_id: user.id, // Include the user_id from the logged-in user
      });

      response.data.createdByClient = true;
      setFolders([...folders, response.data]);
      setNewFolderName("");
      setNewFolderCategory("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:ring-grey-300"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Folder
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>
          <h1 className="text-lg font-bold">Create New Folder</h1>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4 flex items-center">
            <FaFolder className="mr-2 text-gray-700" size={20} />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="folderName">
              Folder Name
            </label>
            <input
              type="text"
              id="folderName"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter folder name"
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaCog className="mr-2 text-gray-700" size={20} />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="folderCategory">
              Folder Category
            </label>
            <select
              id="folderCategory"
              value={newFolderCategory}
              onChange={(e) => setNewFolderCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:ring-grey-300"
            onClick={handleAddFolder}
          >
            Add Folder
          </Button>
          <Button
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-grey-300"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FolderManagementPage;
