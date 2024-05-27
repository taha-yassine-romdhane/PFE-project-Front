import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axios";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle"

const AddModuleCategory = ({ parentId, onCategoryAdded }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showSheet, setShowSheet] = useState(false); // State to control sheet visibility
  const [categories, setCategories] = useState([]); // State to store existing categories

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

  const handleChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
      const response = await axiosClient.post("/api/categories", {
        name: newCategoryName,
        parent_id: parentId,
      });
      console.log("Category added successfully:", response.data);
      setNewCategoryName(""); // Clear the input field after adding the category
      onCategoryAdded(response.data); // Notify the parent component about the added category
      setShowSheet(false); // Hide the sheet after adding the category
    } catch (error) {
      console.error("Error adding category:", error.response);
    }
  };

  const handleSelectCategory = (category) => {
    setNewCategoryName(category.name); // Set the selected category name in the input field
    setShowSheet(false); // Hide the sheet after selecting the category
    // Optionally, you can also trigger the add category action here if needed
    // onCategoryAdded(category);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button
            variant="secondary"
            style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            Add Category
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Category</SheetTitle>
          </SheetHeader>
          <div style={{ padding: "20px" }}>
            <Input
              type="text"
              value={newCategoryName}
              onChange={handleChange}
              placeholder="Enter new category name"
              style={{
                padding: "10px",
                marginBottom: "10px",
              }}
            />
            <Button variant="secondary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger>
          <Button
            variant="secondary"
            style={{
             
              padding: "10px 20px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginLeft: "10px",
            }}
          >
            Select Category
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select Category</SheetTitle>
          </SheetHeader>
          <div style={{ padding: "20px" }}>
            <ul>
              {categories.map((category) => (
                <li key={category.id} style={{ marginBottom: "10px" }}>
                  <Toggle  variant="ghost"  onClick={() => handleSelectCategory(category)}   >
                    {category.name} 
                  </Toggle>
                </li>
              ))}
            </ul>
          </div>
          <Button   onClick={handleAddCategory}>
              Add Category
            </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddModuleCategory;
