import React, { useState, useEffect, useContext } from 'react';
import authAxios from '../api/api';
import { UserContext } from '../routes/UserContext';
import pdfBackground from '../assets/pdfbackground.jpg';
import { FaFilePdf } from 'react-icons/fa';
import Loader from './Loader';
import Navbar from './Navbar'; 

const SavedPDFs = () => {
  const [pdfList, setPdfList] = useState([]);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState('');

  // Function to fetch PDFs
  const fetchPDFs = async () => {
    try {
      setIsLoading(true); 
      const response = await authAxios.get(`/pdf/${localStorage.getItem("userId")}`);
    
      setPdfList(response.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setError('Failed to fetch PDFs.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await authAxios.get(`/user/user-datas/${localStorage.getItem("userId")}`);
      setUserName(response.data.username);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data.');
    }
  };

  useEffect(() => {
    if (currentUser) {
      // Clear previous state before fetching new data
      setUserName('');
      setError('');
      setIsLoading(true);
      
      setPdfList(()=>[]);
      fetchUserData();
      fetchPDFs();
    }
  }, [currentUser]); // Re-run when currentUser changes

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Add the Navbar component */}
      <Navbar />

      <div
        className="p-6 shadow-lg flex flex-col min-h-screen relative"
        style={{
          backgroundImage: `url(${pdfBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white bg-opacity-75 h-screen rounded-lg p-5 overflow-y-auto">
          <h2 className="flex text-violet-700 justify-center text-3xl font-bold mb-4">
            PDF Collection of {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : 'User'}
          </h2>

          {pdfList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...pdfList].map((pdf) => {
                const filePath = pdf.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
                return (
                  <div key={pdf._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                    <FaFilePdf size={40} className="text-red-600 mr-4" />
                    <div className="flex-1">
                      <a
                        href={`/pdf-view?file=${encodeURIComponent(filePath)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-900 hover:underline text-lg font-semibold"
                      >
                        {pdf.filename}
                      </a>
                      <p className="text-gray-500 text-sm">
                        Uploaded on: {new Date(pdf.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No PDFs saved for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPDFs;
