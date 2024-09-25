//@ts-nocheck
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import PDFManager from './PDFManager';

const MainLayout = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  const handleFileUpload = (files) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Extract PDF</h1>
      <FileUpload setUploadedFiles={handleFileUpload} />
      {uploadedFiles.length > 0 && (
        <>
          <PDFManager
            files={uploadedFiles}
            selectedPages={selectedPages}
            setSelectedPages={setSelectedPages}
          />
        </>
      )}
    </div>
  );
};

export default MainLayout;
