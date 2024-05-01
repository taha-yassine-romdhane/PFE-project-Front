import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ModuleIAManagement = ({ filePath }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Log the filePath
  console.log("File Path:", `/pdfs/${(filePath)}`);

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }}>
      
      {/* Sidebar */}
      <div style={{ 
        flex: "0 0 25%", 
        backgroundColor: "#f0f0f0", 
        padding: "20px",
        borderRight: "1px solid #ddd",
        boxSizing: "border-box",

        }}>
        {/* PDF Information */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "10px" }}>PDF Information</h2>
          
          <p>File Size: 5 MB</p>
          <p>Last Modified: April 11, 2024</p>
        </div>

        {/* Document Processing Status */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "10px" }}>Document Processing Status</h2>
          <p>Progress: 50%</p>
          <p>Pages Processed: 5 / 10</p>
          <p>Time Elapsed: 5 minutes</p>
          <p>Estimated Time Remaining: 3 minutes</p>
        </div>

        {/* Document Categories */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "10px" }}>Document Categories</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>Category 1 Devis</li>
            <li>Category 2 COFRAC </li>
            <li>Category 3  </li>
          </ul>
        </div>

        {/* User Account Information (for admin) */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "10px" }}>User Account Information</h2>
          <p>Admin: John Doe</p>
          <p>Email: admin@example.com</p>
        </div>
        
        {/* Recent Activity */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "10px" }}>Recent Activity</h2>
          <p>Document uploaded: DS_GLSI-C.pdf</p>
          <p>Processing completed: DS_GLSI-C.pdf</p>
          <p>Document categorized: DS_GLSI-C.pdf</p>
        </div>
        
      </div>
      
     
{/* PDF Viewer */}
<div style={{ flex: "1", height: "900px", marginLeft: "20px" }}>
  <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
    <Viewer
      fileUrl={`/pdfs/${filePath}`} // Use backend route URL
      plugins={[defaultLayoutPluginInstance]}
    />
  </Worker>
</div>

    </div>
  );
};

export default ModuleIAManagement;
