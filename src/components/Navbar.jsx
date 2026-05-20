import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">D</div>
            <span className="font-bold text-xl hidden sm:inline">DocAppoint</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition">Home</Link>
            <Link to="/appointments" className="text-gray-800 hover:text-blue-600 transition">Appointments</Link>
            {isAuthenticated && <Link to="/dashboard" className="text-gray-800 hover:text-blue-600 transition">Dashboard</Link>}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <img src={user?.photoURL || 'https://via.placeholder.com/40'} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-blue-600 transition">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Register</Link>
              </>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-800">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <Link to="/" className="block text-gray-800 hover:text-blue-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/appointments" className="block text-gray-800 hover:text-blue-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>Appointments</Link>
            {isAuthenticated && <Link to="/dashboard" className="block text-gray-800 hover:text-blue-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>}
            <hr className="my-2" />
            {isAuthenticated ? (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 hover:text-red-600">Logout</button>
            ) : (
              <>
                <Link to="/login" className="block text-gray-800 py-2" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block text-gray-800 py-2" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
