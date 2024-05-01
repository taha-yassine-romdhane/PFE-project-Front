import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <p>{message}</p>
        <div style={modalButtonContainerStyle}>
          <button style={modalButtonStyle} onClick={onConfirm}>Yes</button>
          <button style={modalButtonStyle} onClick={onCancel}>No</button>
        </div>
      </div>
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

const modalButtonContainerStyle = {
  marginTop: "20px",
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

export default ConfirmationDialog;