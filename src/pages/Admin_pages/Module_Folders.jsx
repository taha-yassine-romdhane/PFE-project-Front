import React, { useState, useEffect } from "react";
import { FiFolder, FiPlus, FiEdit, FiTrash2, FiChevronRight, FiChevronDown } from "react-icons/fi"; // Importing icons from react-icons
import axiosClient from "../../api/axios";
import { IoSettingsOutline } from "react-icons/io5";
import AddModuleCategory from "./Module_category";
import CategoriesTable from "./categories_table";

const ModuleFolders = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [addingCategory, setAddingCategory] = useState(null); // State to track the folder where category is being added

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

  const handleAddFolder = async () => {
    try {
      const response = await axiosClient.post("/api/folders", { name: newFolderName });
      console.log("Folder added successfully:", response.data);
      setFolders([...folders, response.data]);
      setNewFolderName(""); // Clear the input field after adding the folder
    } catch (error) {
      console.error("Error adding folder:", error.response);
    }
  };

  const handleEditFolder = async (id, newName) => {
    try {
      const response = await axiosClient.put(`/api/folders/${id}`, { name: newName });
      console.log("Folder updated successfully:", response.data);
      const updatedFolders = folders.map(folder => {
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
      const updatedFolders = folders.filter(folder => folder.id !== id);
      setFolders(updatedFolders);
    } catch (error) {
      console.error("Error deleting folder:", error.response);
    }
  };

  const handleToggleFolder = async (id) => {
    if (!expandedFolders[id]) {
      // Fetch categories for the folder if it's being expanded
      try {
        const response = await axiosClient.get(`/api/folders/${id}/categories`);
        const updatedFolders = folders.map(folder => {
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

    setExpandedFolders(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddCategory = (parentId, category) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === parentId) {
        return { ...folder, children: [...(folder.children || []), category] };
      }
      return folder;
    });
    setFolders(updatedFolders);
    setAddingCategory(null); // Reset adding category state
  };

  return (
    <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '5px' }}>
      <h1>Folder Management</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {folders.map(folder => (
          <li key={folder.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => handleToggleFolder(folder.id)}>
                  {expandedFolders[folder.id] ? <FiChevronDown /> : <FiChevronRight />}
                </button>
                <FiFolder style={{ marginRight: '5px' }} />
                {folder.name}
              </div>
              <div>
                <button onClick={() => handleEditFolder(folder.id, prompt("Enter new folder name", folder.name))}><FiEdit /></button>
                <button onClick={() => handleDeleteFolder(folder.id)}><FiTrash2 /></button>
                <button onClick={() => setAddingCategory(folder.id)}><FiPlus /></button> {/* Button to add category */}
              </div>
            </div>
            {/* Conditional rendering of AddModuleCategory component */}
            {addingCategory === folder.id && (
              <AddModuleCategory
                parentId={folder.id}
                onCategoryAdded={(category) => handleAddCategory(folder.id, category)}
              />
            )}
            {expandedFolders[folder.id] && folder.children && folder.children.length > 0 && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px', marginTop: '5px' }}>
                {folder.children.map(child => (
                  <li key={child.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IoSettingsOutline style={{ marginRight: '5px' }} />
                      {child.name}
                    </div>
                  
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <input
          type="text"
          value={newFolderName}
          onChange={handleChange}
          placeholder="Enter folder name"
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button className="bg-gray-600 hover:bg-gray-800 " onClick={handleAddFolder} style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <FiPlus style={{ marginRight: '5px' }} />
          <span>Add Folder</span>
        </button>
      </div>
      <CategoriesTable/>
    </div>
  );
};

export default ModuleFolders;
