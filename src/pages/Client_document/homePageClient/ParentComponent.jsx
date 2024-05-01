// ParentComponent.js

import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axios";
import SingleBigWidget from "./SingleBigWidget";

const ParentComponent = () => {
  const [pdf_files, setPdf_files] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPdf_files = async () => {
      try {
        const response = await axiosClient.get("/api/pdf_files");
        setPdf_files(response.data.documents);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching pdf_files:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPdf_files();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SingleBigWidget pdf_files={pdf_files} />
      )}
    </div>
  );
};

export default ParentComponent;
