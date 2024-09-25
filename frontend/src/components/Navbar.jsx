import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    navigate('/login'); 
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav 
      className="bg-white shadow-md p-4" 
      initial="hidden" 
      animate="visible" 
      variants={navVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo or Title aligned to the left */}
        <h1 className="text-xl font-bold text-violet-600">PDF MANAGER</h1>

        {/* Buttons aligned to the right */}
        <div className="flex space-x-4 items-center">
          {token ? ( 
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-violet-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-400">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
