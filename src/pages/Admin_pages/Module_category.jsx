import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axios";

const AddModuleCategory = ({ parentId, onCategoryAdded }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showSelectModal, setShowSelectModal] = useState(false); // State to control select modal visibility
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

  const modalStyle = {
    display: showModal ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)"
   
  };

  const selectModalStyle = {
    display: showSelectModal ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fefefe",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSelectModal(false);
  };

  const handleChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
      const response = await axiosClient.post("/api/categories", { name: newCategoryName, parent_id: parentId });
      console.log("Category added successfully:", response.data);
      setNewCategoryName(""); // Clear the input field after adding the category
      onCategoryAdded(response.data); // Notify the parent component about the added category
      setShowModal(false); // Hide the modal after adding the category
    } catch (error) {
      console.error("Error adding category:", error.response);
    }
  };

  const handleSelectCategory = (category) => {
    setNewCategoryName(category.name);
    setShowSelectModal(false);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
        onClick={() => setShowModal(true)}
      >
        Add Category
      </button>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginLeft: "10px"
        }}
        onClick={() => setShowSelectModal(true)}
      >
        Select Category
      </button>
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <span
            style={{
              position: "absolute",
              top: "1px",
              right: "1px",
              cursor: "pointer",
              color: "#888",
              fontSize: "30px",
              fontWeight: "bold"
            }}
            onClick={closeModal}
          >
            &times;
          </span>
          <input
            type="text"
            value={newCategoryName}
            onChange={handleChange}
            placeholder="Enter category name"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)"
            }}
          />
          <button className="bg-gray-600 hover:bg-gray-800 "
            onClick={handleAddCategory}
            style={{
              padding: "10px 20px",
              
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          >
            Add Category
          </button>
        </div>
      </div>
      <div style={selectModalStyle}>
        <h3>Select Category</h3>
        <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
              color: "#888",
              fontSize: "24px",
              fontWeight: "bold"
            }}
            onClick={closeModal}
          >
            &times;
          </span>
        <ul>
          {categories.map(category => (
            <li key={category.id} style={{ marginBottom: "10px" }}>
              <button onClick={() => handleSelectCategory(category)}>{category.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddModuleCategory;

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "300px",
  position: "relative"
};
