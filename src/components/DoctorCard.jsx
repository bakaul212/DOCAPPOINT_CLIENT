import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaStar, FaMapPin, FaBriefcaseMedical } from 'react-icons/fa';

export const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleViewDetails = () => {
    if (!isAuthenticated) navigate('/login');
    else navigate(`/doctor/${doctor.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
      <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <FaBriefcaseMedical className="text-blue-600" />
          <span className="text-gray-600">{doctor.specialty}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <FaMapPin className="text-red-500" />
          <span className="text-gray-600 text-sm">{doctor.location}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <FaStar className="text-yellow-400" />
          <span className="text-gray-600">{doctor.experience}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">৳{doctor.fee}</span>
          <button onClick={handleViewDetails} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
