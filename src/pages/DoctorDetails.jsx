import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BookingForm } from './BookingForm';
import { FaStar, FaMapPin, FaBriefcaseMedical, FaHospital, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorById(id)
      .then(res => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Doctor not found');
        navigate('/appointments');
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <div className="text-center py-12">Doctor not found</div>;

  return (
    <>
      <Helmet>
        <title>{doctor.name} - DocAppoint</title>
        <meta name="description" content={`Book appointment with ${doctor.name}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8 mb-8">
          <div>
            <img src={doctor.image} alt={doctor.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <FaStar className="text-yellow-400" />
              <span className="text-lg text-gray-600">Highly Experienced & Trusted</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FaBriefcaseMedical className="text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Specialty</p>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaHospital className="text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Hospital</p>
                  <p className="text-gray-600">{doctor.hospital}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMapPin className="text-red-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-600">{doctor.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Experience</p>
                  <p className="text-gray-600">{doctor.experience}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-2xl font-bold text-blue-600">Fee: ৳{doctor.fee}</p>
              </div>
            </div>

            <button onClick={() => setShowBookingForm(true)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg">
              Book Appointment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{doctor.description}</p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctor.availability?.map((slot, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-lg text-center">
                <FaClock className="inline text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">{slot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBookingForm && <BookingForm doctor={doctor} onClose={() => setShowBookingForm(false)} />}
    </>
  );
};