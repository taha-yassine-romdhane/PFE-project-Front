import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axios";
import { RoundaboutLeft, RoundedCorner } from "@mui/icons-material";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [folders, setFolders] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axiosClient.get("/api/categories");
        const foldersResponse = await axiosClient.get("/api/folders");

        // Convert folders response to an object with folder IDs as keys
        const foldersData = foldersResponse.data.reduce((acc, folder) => {
          acc[folder.id] = folder.name;
          return acc;
        }, {});

        setCategories(categoriesResponse.data);
        setFolders(foldersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.response);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axiosClient.delete(`/api/categories/${categoryId}`);
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error.response);
    }
  };

  const handleEditCategory = async (categoryId) => {
    const newName = prompt(
      "Enter new category name",
      categories.find((category) => category.id === categoryId).name
    );
    if (newName) {
      try {
        const response = await axiosClient.put(
          `/api/categories/${categoryId}`,
          { name: newName }
        );
        console.log("Category updated successfully:", response.data);
        const updatedCategories = categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, name: newName };
          }
          return category;
        });
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error updating category:", error.response);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>Categories</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Folder Name</th>
            <th style={tableHeaderStyle}>Created At</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{category.id}</td>
              <td style={tableCellStyle}>{category.name}</td>
              <td style={tableCellStyle}>{folders[category.Folder_id]}</td>{" "}
              {/* Use folder name from folders state */}
              <td style={tableCellStyle}>{category.created_at}</td>
              <td style={tableCellStyle}>
                <button
                  className="p-2 bg-gray-800 text-white rounded-full shadow-md mr-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <FiTrash2 />
                </button>
                <button
                  className="p-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handleEditCategory(category.id)}
                >
                  <FiEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
  RoundedCorner: "10px",
};

const tableRowStyle = {
  backgroundColor: "#fff",
};

const tableCellStyle = {
  padding: "8px",
};
