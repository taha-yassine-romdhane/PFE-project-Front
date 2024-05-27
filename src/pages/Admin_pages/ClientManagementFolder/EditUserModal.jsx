import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const EditUserModal = ({ isOpen, onClose, userToEdit, handleEditConfirm, handleEditCancel }) => {
  const [editedUserData, setEditedUserData] = useState({
    email: userToEdit.email,
    name: userToEdit.name,
    role: userToEdit.role,
    telephone: userToEdit.telephone,
  });

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




  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <SheetTrigger>
        <button style={{ display: "none" }}></button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleEditConfirm}>
          <label style={modalLabelStyle}>
            Email:
            <input
              style={modalInputStyle}
              type="text"
              value={editedUserData.email}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, email: e.target.value })
              }
            />
          </label>
          <label style={modalLabelStyle}>
            Name:
            <input
              style={modalInputStyle}
              type="text"
              value={editedUserData.name}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, name: e.target.value })
              }
            />
          </label>
          <label style={modalLabelStyle}>
            Role:
            <input
              style={modalInputStyle}
              type="text"
              value={editedUserData.role}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, role: e.target.value })
              }
            />
          </label>
          <label style={modalLabelStyle}>
            Phone:
            <input
              style={modalInputStyle}
              type="text"
              value={editedUserData.telephone}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, telephone: e.target.value })
              }
            />
          </label>
          <div >
            <Button ClassName={"m-2 , bg-gray-800"} type="submit">
              Save
            </Button>
            <Button  onClick={handleEditCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditUserModal;

