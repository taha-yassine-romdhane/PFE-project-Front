import React, { useState } from "react";
import axiosClient from "../../../api/axios";
import { Margin } from "@mui/icons-material";
import { Button } from "@/components/ui/button";


const AddUserModal = ({ isOpen, onClose }) => {
  const [newUserData, setNewUserData] = useState({
    name: "adem2",
    email: "adem2@example.com",
    role: "Admin",
    password: "adem2adem",
    telephone: "92486670",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post("/api/register", newUserData);
        
      onClose(); // Close the modal after adding the user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal when cancel button is clicked
  };

  return (
    isOpen && (
      <div className="modal" style={modalOverlayStyle}>
        <div className="modal-content" style={modalContentStyle}>
         
          <form onSubmit={handleFormSubmit}>
            <label style={modalLabelStyle}>
              Name:
              <input
                style={modalInputStyle}
                type="text"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                required
              />
            </label>
            <label style={modalLabelStyle}>
              Email:
              <input
                style={modalInputStyle}
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                required
              />
            </label>
            <label style={modalLabelStyle}>
              Role:
              <input
                style={modalInputStyle}
                type="text"
                value={newUserData.role}
                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                required
              />
            </label>
            <label style={modalLabelStyle}>
              Phone:
              <input
                style={modalInputStyle}
                type="text"
                value={newUserData.telephone}
                onChange={(e) => setNewUserData({ ...newUserData, telephone: e.target.value })}
                required
              />
            </label>
            <label style={modalLabelStyle}>
              Password:
              <input
                style={modalInputStyle}
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                required
              />
            </label>
            <div style={modalButtonContainerStyle}>
              <Button  type="submit">Add User</Button>
              <Button  onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

const modalLabelStyle = {
  marginBottom: '10px',
  display: 'block',
  fontWeight: 'bold',
};

const modalInputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const modalButtonContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  
};




const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px', // Adjust width as needed
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
};

export default AddUserModal;
