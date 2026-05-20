import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();

  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const isLongEnough = pwd.length >= 6;

    if (!isLongEnough) return 'Password must be at least 6 characters';
    if (!hasUpperCase) return 'Must contain uppercase letter';
    if (!hasLowerCase) return 'Must contain lowercase letter';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      toast.error('Please fix password errors');
      return;
    }

    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password, formData.photoURL);
    if (result.success) {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } else {
      toast.error(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const result = await googleLogin(credentialResponse.credential);
    if (result.success) {
      toast.success('Registered successfully!');
      navigate('/');
    } else {
      toast.error(result.error || 'Google signup failed');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Register - DocAppoint</title>
        <meta name="description" content="Create your DocAppoint account" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Register</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your full name" />
            </div>

            <div>
              <label className="block text-gray-900 font-semibold mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="your@email.com" />
            </div>

            <div>
              <label className="block text-gray-900 font-semibold mb-2">Photo URL</label>
              <input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="https://example.com/photo.jpg" />
            </div>

            <div>
              <label className="block text-gray-900 font-semibold mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button type="submit" disabled={loading || passwordError} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 mt-6">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="mb-6">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google signup failed')} />
          </div>

          <p className="text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};
