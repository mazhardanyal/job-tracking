import { useState, useEffect } from "react";
import { FaTimes, FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";

function ProfileModal({ isOpen, onClose, user, setUser }) {
  const [profile, setProfile] = useState(null); // dynamic profile state
  const [editMode, setEditMode] = useState(false); // toggle edit mode
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Fetch user profile when modal opens
  useEffect(() => {
    if (isOpen && user) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfile(res.data);
          setFormData({ name: res.data.name, email: res.data.email, password: "" });
        } catch (err) {
          console.log(err);
        }
      };
      fetchProfile();
    }
  }, [isOpen, user]);

  if (!isOpen || !profile) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/auth/me",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setUser(res.data); // update App.jsx user state
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-80 p-6 relative animate-slide-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>

        {/* User Info */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <img
            src={user.image}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
          />
          {!editMode ? (
            <>
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </>
          ) : (
            <>
              <input
                className="border w-full text-center p-1 rounded"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="border w-full text-center p-1 rounded"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="border w-full text-center p-1 rounded"
                name="password"
                type="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}
        </div>

        {/* Stats */}
        {!editMode && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 rounded-xl p-3 flex flex-col items-center">
              <span className="text-gray-600 text-sm">Applied</span>
              <span className="font-bold text-blue-600 text-lg">{user.stats.applied}</span>
            </div>
            <div className="bg-green-100 rounded-xl p-3 flex flex-col items-center">
              <span className="text-gray-600 text-sm">Hired</span>
              <span className="font-bold text-green-600 text-lg">{user.stats.hired}</span>
            </div>
            <div className="bg-yellow-100 rounded-xl p-3 flex flex-col items-center">
              <span className="text-gray-600 text-sm">Interview</span>
              <span className="font-bold text-yellow-600 text-lg">{user.stats.interview}</span>
            </div>
            <div className="bg-red-100 rounded-xl p-3 flex flex-col items-center">
              <span className="text-gray-600 text-sm">Rejected</span>
              <span className="font-bold text-red-600 text-lg">{user.stats.rejected}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {!editMode ? (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all justify-center"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all justify-center"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all justify-center">
            Change Password
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all justify-center"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload(); // simple logout
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
