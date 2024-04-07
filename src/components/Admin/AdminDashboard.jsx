import { useState, useRef } from "react";
import { X, Upload } from "react-feather";
import DataTable from "../DataTable";

const AdminDashboard = () => {
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
                ADMIN page
            </main>
        </div>
    );
};

export default AdminDashboard;
