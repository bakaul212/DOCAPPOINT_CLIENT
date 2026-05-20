import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { createAppointment } from '../utils/api';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

export const BookingForm = ({ doctor, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    gender: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        userEmail: user?.email,
        doctorName: doctor.name,
        patientName: formData.patientName,
        gender: formData.gender,
        phone: formData.phone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        doctorId: doctor.id,
      };

      await createAppointment(bookingData);
      toast.success('Appointment booked successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>
        <p className="text-gray-600 mb-4 font-semibold">With {doctor.name}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Patient Name</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="01xxxxxxxxx" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Appointment Date</label>
            <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Appointment Time</label>
            <select name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Select Time</option>
              {doctor.availability?.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};