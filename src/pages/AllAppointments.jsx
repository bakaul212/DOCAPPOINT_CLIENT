import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAppointments } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FaSearch, FaClock, FaMapPin, FaUserMd } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getAppointments()
      .then(res => {
        setAppointments(res.data);
        setFilteredAppointments(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load appointments');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [searchTerm, sortBy, appointments]);

  const filterAndSort = () => {
    let filtered = [...appointments];
    if (searchTerm.trim()) {
      filtered = filtered.filter(apt =>
        apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.doctorName || a.name || '').localeCompare(b.doctorName || b.name || '');
        case 'fee-low':
          return (a.fee || 0) - (b.fee || 0);
        case 'fee-high':
          return (b.fee || 0) - (a.fee || 0);
        default:
          return 0;
      }
    });

    setFilteredAppointments(filtered);
  };

  const handleViewDetails = (doctorId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/doctors/${doctorId}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>All Appointments - DocAppoint</title>
        <meta name="description" content="Browse all available doctor appointments" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Appointments</h1>

        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="name">Sort by Name</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No appointments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((apt) => (
              <div key={apt._id || apt.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6">
                <img src={apt.image} alt={apt.doctorName || apt.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{apt.doctorName || apt.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUserMd className="text-blue-600" />
                    <span>{apt.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-blue-600" />
                    <span>{apt.availability?.[0] || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapPin className="text-red-500" />
                    <span>{apt.location}</span>
                  </div>
                  <div className="text-blue-600 font-bold text-lg">৳{apt.fee}</div>
                </div>
                <button
                  onClick={() => handleViewDetails(apt._id || apt.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-bold"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
