import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">D</div>
              <span className="font-bold text-lg">DocAppoint</span>
            </div>
            <p className="text-gray-400">Your trusted doctor appointment booking platform</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Doctors</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Appointments</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <FaFacebook size={24} className="cursor-pointer hover:text-blue-400" />
              <FaTwitter size={24} className="cursor-pointer hover:text-blue-400" />
              <FaLinkedin size={24} className="cursor-pointer hover:text-blue-400" />
              <FaInstagram size={24} className="cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DocAppoint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};