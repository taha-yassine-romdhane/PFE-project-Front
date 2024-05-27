import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axios";
import ConfirmationDialog from "./ConfirmationDialog";
import AddUserModal from "./AddUserModal";
import { User } from "react-feather";

import { RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
const ClientManagement = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // State to track user to delete
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/api/users");
        if (Array.isArray(response.data.results)) {
          setUsers(response.data.results);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    // Show edit modal with user data
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleEditConfirm = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a PUT request to update user data
      await axiosClient.put(`/api/usersupdate/${userToEdit.id}`, userToEdit);

      // Update the local state with the updated user data
      setUsers(users.map((u) => (u.id === userToEdit.id ? userToEdit : u)));

      // Close modal
      setShowEditModal(false);
      console.log(userToEdit);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditCancel = () => {
    // Reset the userToEdit state
    setUserToEdit(null);
    // Close the edit modal
    setShowEditModal(false);
  };

  const handleDeleteClick = (user) => {
    // Set the user to delete and show the delete modal
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosClient.delete(`/api/usersdelete/${userToDelete.id}`);
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
  };

  return (
    <div style={{ margin: "auto", maxWidth: "800px" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px" }}
      >
        Users Management Table
      </h1>
      <div>
        <Button
          className="p-2 bg-gray-800   mr-2 hover:bg-gray-700 m-2  focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleAddUser}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <User />
            <div style={{ marginLeft: "8px" }}>Add User</div>
          </div>
        </Button>

        <AddUserModal
          isOpen={showAddUserModal}
          onClose={handleCloseAddUserModal}
          onAddUser={handleAddUser}
        />
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Role</th>
            <th style={tableHeaderStyle}>phone</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{user.id}</td>
              <td style={tableCellStyle}>{user.name}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.role}</td>
              <td style={tableCellStyle}>{user.telephone}</td>
              <td style={{ textAlign: "center" }}>
                {/* Edit button with RiEditBoxLine icon */}
                <button
                  onClick={() => handleEditClick(user)}
                  className="p-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-blue-700 focus:ring-2 mr-1 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <RiEditBoxLine />
                </button>

                {/* Delete button with FaRegTrashAlt icon */}
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="p-2 bg-gray-800 text-white rounded-full shadow-md mr-2 hover:bg-red-700  focus:ring-2 ml-1 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && (
        <ConfirmationDialog
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <p>Edit User</p>
            <form onSubmit={handleEditConfirm}>
              <label style={modalLabelStyle}>
                Email:
                <input
                  style={modalInputStyle}
                  type="text"
                  value={userToEdit.email}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, email: e.target.value })
                  }
                />
              </label>
              <label style={modalLabelStyle}>
                Name:
                <input
                  style={modalInputStyle}
                  type="text"
                  value={userToEdit.name}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, name: e.target.value })
                  }
                />
              </label>
              <label style={modalLabelStyle}>
                Role:
                <input
                  style={modalInputStyle}
                  type="text"
                  value={userToEdit.role}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, role: e.target.value })
                  }
                />
              </label>
              <label style={modalLabelStyle}>
                Phone:
                <input
                  style={modalInputStyle}
                  type="text"
                  value={userToEdit.telephone}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, telephone: e.target.value })
                  }
                />
              </label>
              <div style={{ marginTop: "20px" }}>
                <Button type="submit" style={{ marginRight: "10px" }}>
                  Save
                </Button>
                <Button onClick={handleEditCancel}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px", // Adjust width as needed
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
};

const modalLabelStyle = {
  marginBottom: "10px",
  display: "block",
  fontWeight: "bold",
};

const modalInputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const modalButtonContainerStyle = {
  marginTop: "20px",
};

const tableHeaderStyle = {
  padding: "12px 16px", // Increase padding for better spacing
  borderBottom: "1px solid #e0e0e0", // Change border color to a lighter shade
  backgroundColor: "#f5f5f5", // Use a slightly lighter background color
  color: "#333", // Set text color to a darker shade for better contrast
  fontWeight: "bold",
  textTransform: "uppercase",
  borderRadius: "4px",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: " 12px", // Increase padding for better spacing
  borderBottom: "1px solid #e0e0e0", // Add a bottom border for separation
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalButtonStyle = {
  padding: "8px 16px",
  marginRight: "10px",
  backgroundColor: "#8b8b8b",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
};

export default ClientManagement;
