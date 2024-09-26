//@ts-nocheck
import React, { useState, useContext } from 'react';
import NavBar from './Navbar';
import MainLayout from './MainLayout';
import SaveUploadPdf from './SaveUploadPdf';
import { motion } from 'framer-motion';
import pdfBackground from '../assets/pdfbackground.jpg';
import { Link } from 'react-router-dom';
import { UserContext } from '../routes/UserContext';
import { FaUpload, FaFilePdf } from 'react-icons/fa';

const Home = () => {
  const [activeSection, setActiveSection] = useState('main');
  const { currentUser } = useContext(UserContext);



  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundImage: `url(${pdfBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navigation Bar */}
      <NavBar />

      {/* Button Container Above Sections */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button
          onClick={() => setActiveSection('main')}
          className={`flex items-center p-4 rounded-md transition-colors duration-300 ${activeSection === 'main' ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-violet-300'}`}
        >
          <FaFilePdf className="mr-2" />
          PDF Extractor
        </button>
        <button
          onClick={() => setActiveSection('upload')}
          className={`flex items-center p-4 rounded-md transition-colors duration-300 ${activeSection === 'upload' ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-violet-300'}`}
        >
          <FaUpload className="mr-2" />
          Save Upload PDF
        </button>

        {/* Only show "Saved PDF" button if user is logged in */}
        {/* {currentUser && ( */}
          <Link to={`/saved-pdfs/${currentUser}`}>
            <button className="flex items-center p-4 rounded-md bg-violet-500 text-white hover:bg-violet-400 transition-colors duration-300">
              <FaFilePdf className="mr-2" />
              Saved PDF
            </button>
          </Link>
        {/* )} */}
      </div>



      {/* Sections Container */}
      <div className="flex flex-col md:flex-row justify-center items-center flex-grow p-8">
        {/* Main Layout Section */}
        {activeSection === 'main' && (
          <motion.div
            className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <MainLayout />
          </motion.div>
        )}

        {/* SaveUploadPdf Section */}
        {activeSection === 'upload' && (
          <motion.div
            className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <SaveUploadPdf />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
