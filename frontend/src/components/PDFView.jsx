//@ts-nocheck
import React from 'react';
import { useLocation } from 'react-router-dom';

const PDFView = () => {
  const location = useLocation();
  
  // Extract the 'file' query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const file = queryParams.get('file');


  const fileName = file && file.split('/').pop();
  console.log(file)
  console.log(fileName)

  return (
    <div className="flex justify-center items-center min-h-screen">
      {file ? (
        <iframe
          src={`http://localhost:4000/uploads/${fileName}`}
          width="100%"
          height="775px"
          title="PDF Viewer"
          frameBorder="0"
        />
      ) : (
        <p>PDF not found</p>
      )}
    </div>
  );
};

export default PDFView;
