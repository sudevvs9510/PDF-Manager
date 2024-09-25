//@ts-nocheck
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const FileUpload = ({ setUploadedFiles }) => {
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === 'application/pdf');

    if (validFiles.length > 0) {
      setUploadedFiles([...validFiles])
    } else {
      setError('Please upload valid PDF files');
    }
  };

  return (
    <div className="w-full mb-8 p-8 border-2 border-dashed border-violet-300 rounded-lg text-center relative bg-white">
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ outline: 'none' }}
      />
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white">
          <AiOutlinePlus size={24} />
        </div>
        <p className="text-gray-500">Drag & drop files here or click to select</p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
