import  'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-blue-100 mb-8">Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition text-lg">
            <FaHome /> Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};