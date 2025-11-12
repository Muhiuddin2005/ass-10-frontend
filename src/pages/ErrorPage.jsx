import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-4">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
