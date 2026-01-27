import { FaTimes, FaMoon, FaSun } from "react-icons/fa";

function ProfileModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const { name, email, image, stats } = user;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-80 p-6 relative animate-slide-down">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        {/* User Info */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
          />
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 rounded-xl p-3 flex flex-col items-center">
            <span className="text-gray-600 text-sm">Applied</span>
            <span className="font-bold text-blue-600 text-lg">{stats.applied}</span>
          </div>
          <div className="bg-green-100 rounded-xl p-3 flex flex-col items-center">
            <span className="text-gray-600 text-sm">Hired</span>
            <span className="font-bold text-green-600 text-lg">{stats.hired}</span>
          </div>
          <div className="bg-yellow-100 rounded-xl p-3 flex flex-col items-center">
            <span className="text-gray-600 text-sm">Interview</span>
            <span className="font-bold text-yellow-600 text-lg">{stats.interview}</span>
          </div>
          <div className="bg-red-100 rounded-xl p-3 flex flex-col items-center">
            <span className="text-gray-600 text-sm">Rejected</span>
            <span className="font-bold text-red-600 text-lg">{stats.rejected}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all justify-center">
            Edit Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all justify-center">
            Change Password
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all justify-center">
            Logout
          </button>
        </div>

        {/* Optional Theme Toggle */}
        <div className="flex justify-center mt-4 gap-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
            <FaSun className="text-yellow-400" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
            <FaMoon className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
