// //@ts-nocheck
// import React, { useState } from 'react';
// import { AiOutlinePlus } from 'react-icons/ai';
// import axios from 'axios';

// const FileUploadAndSave = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [error, setError] = useState('');
//   const [uploadStatus, setUploadStatus] = useState('');

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter((file) => file.type === 'application/pdf');

//     if (validFiles.length > 0) {
//       setUploadedFiles(validFiles);
//       setError('');
//     } else {
//       setError('Please upload valid PDF files');
//     }
//   };


//   const saveToDatabase = async () => {
//     const formData = new FormData();
//     uploadedFiles.forEach((file) => {
//       formData.append('files', file);
//     });

//     try {
//       const response = await axios.post('http://localhost:4000/pdf/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setUploadStatus('Files uploaded successfully');
//       console.log('Response from server:', response.data);
//     } catch (error) {
//       setUploadStatus('Error uploading files');
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <div className='container mx-auto px-4 py-8'>
//       <h1 className="text-3xl font-bold mb-8 text-center">Save PDF</h1>
//       <div className="w-full mb-8 p-8 border-2 border-dashed border-violet-300 rounded-lg text-center relative bg-white">
//         <input
//           type="file"
//           accept=".pdf"
//           multiple
//           onChange={handleFileUpload}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           style={{ outline: 'none' }}
//         />

//         <div className="flex flex-col items-center justify-center h-full space-y-4">
//           <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white">
//             <AiOutlinePlus size={24} />
//           </div>
//           <p className="text-gray-500">Drag & drop files here or click to select</p>
//         </div>


//       </div>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {uploadStatus && <p className="text-green-500 mt-2">{uploadStatus}</p>}
//       {uploadedFiles.length > 0 && (
//         <button
//           onClick={saveToDatabase}
//           className="flex items-center justify-center bg-violet-500 text-white mt-4 px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       )}
//     </div>
//   );
// };

// export default FileUploadAndSave;







// @ts-nocheck
import React, { useState, useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import authAxios from '../api/api';
import { UserContext } from '../routes/UserContext';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

const FileUploadAndSave = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState('');
  const [fileTitles, setFileTitles] = useState({});

  const { currentUser } = useContext(UserContext);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === 'application/pdf');

    if (validFiles.length > 0) {
      const newFileTitles = {};
      validFiles.forEach((file) => {
        newFileTitles[file.name] = file.name;
      });
      setUploadedFiles(validFiles);
      setFileTitles(newFileTitles);
      setError('');
    } else {
      setError('Please upload valid PDF files');
    }
  };

  const handleTitleChange = (fileName, newTitle) => {
    setFileTitles((prevTitles) => ({
      ...prevTitles,
      [fileName]: newTitle,
    }));
  };

  const saveToDatabase = async () => {
    if (!currentUser) {
      setError('User is not logged in');
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file, index) => {
      formData.append('files', file);
      formData.append(`titles[${index}]`, fileTitles[file.name]);
    });

    formData.append('userId', currentUser.id); // Use the logged-in user's ID

    try {
      const response = await authAxios.post('/pdf/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success toast
      toast.success('Files uploaded successfully!');

      // Clear file selection and titles
      setUploadedFiles([]);
      setFileTitles({});
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const existingTitles = error.response.data.existingTitles.join(', ');
        toast.error(`Title already exist: ${existingTitles}`);
      } else {
        toast.error('Error uploading files');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster /> {/* Add Toaster to display toast messages */}

      <h1 className="text-3xl font-bold mb-8 text-center">Save PDF</h1>

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
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Uploaded PDFs:</h2>
          <ul className="list-disc pl-5 space-y-2">
            {uploadedFiles.map((file) => (
              <li key={file.name} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={fileTitles[file.name] || ''}
                  onChange={(e) => handleTitleChange(file.name, e.target.value)}
                  className="w-full border rounded p-1"
                  placeholder="Edit title"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={saveToDatabase}
            className="bg-violet-500 text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadAndSave;
