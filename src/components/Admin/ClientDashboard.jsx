import React, { useState } from "react";
import DataTable from "../DataTable";
import Client_Folders from "../../pages/Client_document/homePageClient/Client_Folders";
import FileManagement from "../../pages/FileManagement";
const ClientDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <main className="flex flex-col flex-1">
        {/* Dashboard Content */}
        <div className="p-2">
        <FileManagement/>
         
        

          {/* Client Folders Widget */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Folders </h2>
            <div className="bg-white p-8 shadow rounded-lg">
              
              <Client_Folders onFileClick={handleFileClick} />
            </div>
          </div>

          {/* Forms Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Questions response example </h2>
            <div className="bg-white p-8 shadow rounded-lg">
              {/* Example form */}
              <form>
                <div>
                  <DataTable />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;

