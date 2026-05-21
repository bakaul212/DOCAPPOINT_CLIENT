import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const MyProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    photoURL: user?.photoURL || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateProfile(formData.name, formData.photoURL);
    if (result.success) {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h2>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {!isEditing ? (
          <div className="max-w-md mx-auto">
            <img src={user?.photoURL || 'https://via.placeholder.com/200'} alt={user?.name} className="w-40 h-40 rounded-full mx-auto mb-6 object-cover" />
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-600 font-semibold">Full Name</p>
                <p className="text-gray-900 text-lg">{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Email Address</p>
                <p className="text-gray-900 text-lg">{user?.email}</p>
              </div>
            </div>
            <button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-bold">
              Update Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <div>
              <label className="block font-semibold mb-2">Photo URL</label>
              <input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-bold disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition font-bold">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};