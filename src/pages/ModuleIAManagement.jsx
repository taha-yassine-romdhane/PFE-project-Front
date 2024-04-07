import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ModuleIAManagement = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
      <div
        style={{
          height: "750px",
          width: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Viewer
          fileUrl="/src/assets/DS_GLSI-C.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
</Worker>
    
  );
};

export default ModuleIAManagement;
