import { useState, useRef } from "react";
import { X, Upload } from "react-feather";
import DataTable from "../DataTable";
import ModuleIAManagement from "../../pages/ModuleIAManagement";
import FolderProgressWidget from "../FolderProgressWidget";
import ProgressPieChart from "../ProgressPieChart";
const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (file) => {
    const filteredFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(filteredFiles);
  };

  const handleUpload = () => {
    // Implement file upload logic here
    console.log("Selected files:", selectedFiles);
  };

  const pieChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    values: [12, 19, 3, 5, 2],
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <main className="flex flex-col flex-1">
        {/* Dashboard Content */}
        <div className="p-2">
      
                             {/* Widgets or Charts */}
                             <div className="bg-white p-8 shadow rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-semibold">Single Big Widget</h3>
              {/* Small navigation bar */}
              <nav className="flex">
                <button className="text-gray-800 font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-300 shadow-md">
                  Vos Documents
                </button>
                <button className="text-gray-800 font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-300 shadow-md">
                  Archives
                </button>
                <button className="text-gray-800 font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-300 shadow-md">
                  Historique
                </button>
              </nav>
            </div>
            {/* Search zone */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 shadow-md"
              />
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2 shadow-md">
                Search
              </button>
            </div>
          </div>

          <div className="mt-4 relative">
            <div className="flex justify-center">
              {/* Left half: Upload section */}
              <div className="w-1/2 ">
                <div className="flex flex-col items-center justify-center  border-gray-300 border-dashed rounded-lg py-16 shadow-md">
                  <Upload
                    className="h-12 w-12 text-gray-500 mb-2"
                    onClick={handleUploadClick}
                  />
                  <h2 className="text-lg font-semibold mb-2">Upload Files</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    We accept only (.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx,
                    .txt)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  />
                  <button
                    onClick={handleUpload}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2 shadow-md"
                  >
                    Upload
                  </button>
                </div>
              </div>
              {/* Right half: Display selected files */}
              <div className="w-1/2 h-50 ">
                <div className="flex flex-col items-center justify-center  border-gray-300 border-dashed rounded-lg py-4 px-2 shadow-md h-full">
                  <h2 className="text-lg font-semibold mb-2">Selected Files</h2>
                  <div className="flex flex-col gap-2 overflow-y-auto h-40">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 rounded-md p-2"
                      >
                        <span>{file.name}</span>
                        <button
                          onClick={() => handleRemoveFile(file)}
                          className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center p-1 rounded-md"
                        >
                          <X />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
     
          {/* Forms */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Data Table Page</h2>
            <div className="bg-white p-4 shadow rounded-lg">
              {/* Example form */}
              <form>
                <div>
                  <DataTable />
                </div>
              </form>
              <container>
                <div className="mt-8">
                  {/* Include ModuleIAManagement here */}
                  <ModuleIAManagement />
                </div>
                
              </container>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
