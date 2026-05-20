import React, { useEffect, useState } from 'react';
import { getUserAppointments, updateAppointment, deleteAppointment } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const response = await getUserAppointments();
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load bookings');
      setLoading(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingId(booking._id);
    setEditData(booking);
  };

  const handleSaveUpdate = async () => {
    if (!editData) return;
    try {
      await updateAppointment(editingId, {
        patientName: editData.patientName,
        phone: editData.phone,
        appointmentDate: editData.appointmentDate,
        appointmentTime: editData.appointmentTime,
      });
      toast.success('Appointment updated successfully!');
      setEditingId(null);
      setEditData(null);
      fetchMyBookings();
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteAppointment(bookingId);
      toast.success('Appointment deleted successfully!');
      fetchMyBookings();
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-600 text-lg">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
              {editingId === booking._id ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Appointment</h3>
                  
                  <input type="text" value={editData.patientName} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-100" />
                  <input type="text" value={editData.doctorName} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-100" />
                  <input type="tel" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input type="date" value={editData.appointmentDate} onChange={(e) => setEditData({...editData, appointmentDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input type="text" value={editData.appointmentTime} onChange={(e) => setEditData({...editData, appointmentTime: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />

                  <div className="flex gap-3">
                    <button onClick={handleSaveUpdate} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Save</button>
                    <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.doctorName}</h3>
                    <div className="space-y-1 text-gray-600">
                      <p><strong>Patient:</strong> {booking.patientName}</p>
                      <p><strong>Date:</strong> {new Date(booking.appointmentDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {booking.appointmentTime}</p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(booking)} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(booking._id)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
