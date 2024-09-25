import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-violet-500">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500">
      <button className='bg-violet-500 py-2 px-4 rounded text-white'>
        Go back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
