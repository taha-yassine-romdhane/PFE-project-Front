import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [folders, setFolders] = useState({});
  const [loading, setLoading] = useState(true);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axiosClient.get("/api/categories");
        const foldersResponse = await axiosClient.get("/api/folders");

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

  const handleEditCategory = async () => {
    try {
      const response = await axiosClient.put(
        `/api/categories/${editCategoryId}`,
        { name: editCategoryName }
      );
      console.log("Category updated successfully:", response.data);
      const updatedCategories = categories.map((category) => {
        if (category.id === editCategoryId) {
          return { ...category, name: editCategoryName };
        }
        return category;
      });
      setCategories(updatedCategories);
      setEditCategoryId(null);
      setEditCategoryName("");
    } catch (error) {
      console.error("Error updating category:", error.response);
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
      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHead>
          <TableCell>ID</TableCell>
        </TableHead>
        <TableHead>
          <TableCell>Name</TableCell>
        </TableHead>
        <TableHead>
          <TableCell>Folder Name</TableCell>
        </TableHead>
        <TableHead>
          <TableCell>Created At</TableCell>
        </TableHead>
        <TableHead>
          {" "}
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          <TableRow></TableRow>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell className="flex  items-center" ><FaCog  className="mr-2 text-gray-700" /> {category.name}</TableCell>
              <TableCell  className="  items-center" >  
                 <div className="flex items-center" >
                 <FaFolder className="mr-2 text-gray-700" /> {folders[category.Folder_id]}
                </div> </TableCell>
              <TableCell>{category.created_at}</TableCell>
              <TableCell>
                <button
                  className="p-2 bg-gray-800 text-white rounded-full shadow-md mr-2 hover:bg-red-700  focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                 <FiTrash2  /> 
                </button>
                <Sheet>
                  <SheetTrigger>
                    <button
                      className="p-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      onClick={() => {
                        setEditCategoryId(category.id);
                        setEditCategoryName(category.name);
                      }}
                    >
                      <FiEdit />
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Category</SheetTitle>
                    </SheetHeader>
                    <div style={{ padding: "20px" }}>
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        placeholder="Enter new category name"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Button
                        className="sheet-confirm-button"
                        onClick={handleEditCategory}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
