import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth';
import { MyBookings } from './MyBookings';
import { MyProfile } from './MyProfile';

export const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <>
      <Helmet>
        <title>Dashboard - DocAppoint</title>
        <meta name="description" content="Manage your appointments and profile" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6 pb-6 border-b">
                <img src={user?.photoURL || 'https://via.placeholder.com/100'} alt={user?.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <div className="space-y-2">
                <button onClick={() => setActiveTab('bookings')} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100'}`}>
                  My Bookings
                </button>
                <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100'}`}>
                  My Profile
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {activeTab === 'bookings' && <MyBookings />}
              {activeTab === 'profile' && <MyProfile />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};