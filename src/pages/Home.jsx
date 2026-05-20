import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getDoctors } from '../utils/api';
import { DoctorCard } from '../components/DoctorCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then(res => {
        setDoctors(res.data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load doctors');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - DocAppoint | Book Your Doctor Appointment</title>
        <meta name="description" content="DocAppoint - Book appointments with top-rated doctors online." />
      </Helmet>

      <section className="h-96 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} className="h-full">
          {[1, 2, 3].map((item) => (
            <SwiperSlide key={item} className="flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
                <p className="text-lg mb-8 max-w-2xl mx-auto">Book appointments with the best doctors in your area. Quick, easy, and secure.</p>
                <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition">Get Started</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">Top Rated Doctors</h2>
        <p className="text-gray-600 text-center mb-12">Meet our most experienced doctors</p>

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
          </div>
        )}
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose DocAppoint?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Easy Booking', desc: 'Book in just a few clicks' },
              { title: 'Expert Doctors', desc: 'Verified medical professionals' },
              { title: '24/7 Support', desc: 'Round-the-clock support' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">{idx + 1}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About DocAppoint</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">DocAppoint is a modern healthcare solution connecting patients with qualified doctors.</p>
            <p className="text-gray-600 leading-relaxed">We've helped thousands get medical consultations conveniently.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1576091160550-112173f31c77?w=500" alt="About" className="w-full rounded-lg shadow-lg" />
        </div>
      </section>
    </>
  );
};