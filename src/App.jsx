import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { DoctorDetails } from './pages/DoctorDetails';
import { AllAppointments } from './pages/AllAppointments';
import { Dashboard } from './pages/Dashboard/index';
import { NotFound } from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />
                <Route path="/appointments" element={<AllAppointments />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
