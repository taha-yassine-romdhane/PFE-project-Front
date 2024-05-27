import React, { useState, useEffect } from "react";
import {
  FiFolder,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi"; // Importing icons from react-icons
import axiosClient from "../../api/axios";
import { Button } from "@/components/ui/button";
import AddFolderModal from "./AddFolderModal";
import AddCategoryModal from "./AddCategoryModal";
import TestModal from "./TestModal";
import TreeItem from "./TreeItem";
import CategoriesTable from "./categories_table";

const ModuleFolders = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [addingCategory, setAddingCategory] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [segmentationZones, setSegmentationZones] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axiosClient.get("/api/folders");
        setFolders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching folders:", error.response);
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.response);
      }
    };

    fetchCategories();
  }, []);

  const handleAddFolder = async () => {
    try {
      const response = await axiosClient.post("/api/folders", {
        name: newFolderName,
      });
      console.log("Folder added successfully:", response.data);
      setFolders([...folders, response.data]);
      setNewFolderName("");
      closeFolderModal();
    } catch (error) {
      console.error("Error adding folder:", error.response);
    }
  };

  const handleEditFolder = async (id, newName) => {
    try {
      const response = await axiosClient.put(`/api/folders/${id}`, {
        name: newName,
      });
      console.log("Folder updated successfully:", response.data);
      const updatedFolders = folders.map((folder) => {
        if (folder.id === id) {
          return { ...folder, name: newName };
        }
        return folder;
      });
      setFolders(updatedFolders);
    } catch (error) {
      console.error("Error updating folder:", error.response);
    }
  };

  const handleDeleteFolder = async (id) => {
    try {
      await axiosClient.delete(`/api/folders/${id}`);
      console.log("Folder deleted successfully:", id);
      const updatedFolders = folders.filter((folder) => folder.id !== id);
      setFolders(updatedFolders);
    } catch (error) {
      console.error("Error deleting folder:", error.response);
    }
  };

  const handleToggleFolder = async (id) => {
    if (!expandedFolders[id]) {
      try {
        const response = await axiosClient.get(`/api/folders/${id}/categories`);
        const updatedFolders = folders.map((folder) => {
          if (folder.id === id) {
            return { ...folder, children: response.data };
          }
          return folder;
        });
        setFolders(updatedFolders);
      } catch (error) {
        console.error("Error fetching categories for folder:", error.response);
      }
    }

    setExpandedFolders((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddCategory = (parentId, category) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === parentId) {
        return { ...folder, children: [...(folder.children || []), category] };
      }
      return folder;
    });
    setFolders(updatedFolders);
    setAddingCategory(null);
    closeCategoryModal();
  };

  const openCategoryModal = (folderId) => {
    setCurrentFolderId(folderId);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setCurrentFolderId(null);
  };

  const openFolderModal = () => {
    setIsFolderModalOpen(true);
  };

  const closeFolderModal = () => {
    setIsFolderModalOpen(false);
  };

  const openTestModal = () => {
    setIsTestModalOpen(true);
  };

  const closeTestModal = () => {
    setIsTestModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Folder Management</h1>
      <ul className="space-y-4">
        {folders.map((folder) => (
          <li key={folder.id} className="border-b pb-2">
            <TreeItem
              item={folder}
              isExpanded={expandedFolders[folder.id]}
              handleToggle={handleToggleFolder}
              handleEdit={(id) =>
                handleEditFolder(
                  id,
                  prompt("Enter new folder name", folder.name)
                )
              }
              handleDelete={handleDeleteFolder}
              handleAddCategory={openCategoryModal}
              isCategory={false}
            />
            {expandedFolders[folder.id] && folder.children && (
              <ul className="ml-6 mt-2 space-y-2">
                {folder.children.map((child) => (
                  <li key={child.id}>
                    <TreeItem
                      item={child}
                      handleToggle={() => {}}
                      handleEdit={() => {}}
                      handleDelete={handleDeleteFolder}
                      handleAddCategory={() => {}}
                      isCategory={true}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="m-2 flex items-center ">
        <Button onClick={openFolderModal}>
          <FiPlus className="m-2" />
          <span>Add Folder</span>
        </Button>
        <Button onClick={openTestModal} className="m-4 ">
          <span>Test Documents </span>
        </Button>
      </div>
      <CategoriesTable />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        closeModal={closeCategoryModal}
        currentFolderId={currentFolderId}
        handleAddCategory={handleAddCategory}
      />

      <AddFolderModal
        isOpen={isFolderModalOpen}
        closeModal={closeFolderModal}
        newFolderName={newFolderName}
        handleChange={handleChange}
        handleAddFolder={handleAddFolder}
      />

      <TestModal
        isOpen={isTestModalOpen}
        closeModal={closeTestModal}
        segmentationZones={segmentationZones}
        categories={categories}
      />
    </div>
  );
};

export default ModuleFolders;
