import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Token যাচাই করার ফাংশন
  const verifyToken = async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      // ব্যাকএন্ড যদি সরাসরি ইউজার অবজেক্ট পাঠায় অথবা { user } পাঠায়, দুটিই হ্যান্ডেল করবে:
      const userData = response.data.user || response.data;
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); 
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        
        // টোকেনটি এখনো ভ্যালিড কিনা ব্যাকএন্ড থেকে চেক করা হচ্ছে
        verifyToken(storedToken);
        return; 
      } catch (e) {
        console.error('Failed to parse local storage user data:', e);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // সাধারণ লগইন
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // রেজিস্ট্রেশন
  const register = async (name, email, password, photoURL) => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        name, email, password, photoURL
      });
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  // গুগল লগইন
  const googleLogin = async (credential) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/google`, { credential });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Google login failed' };
    }
  };

  // লগআউট
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // প্রোফাইল আপডেট
  const updateProfile = async (name, photoURL) => {
    try {
      await axios.put(
        `${API_URL}/api/users/profile`,
        { name, photoURL },
        { headers: { Authorization: `Bearer ${token}` } } // এখানে state থেকে টোকেন সরাসরি যাচ্ছে
      );
      
      const updatedUser = { ...user, name, photoURL };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading, login, register, googleLogin, logout, updateProfile,
      isAuthenticated: !!user && !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};