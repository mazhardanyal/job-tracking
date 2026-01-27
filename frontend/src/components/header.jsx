import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header({ onAdd, userImage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-4 flex justify-between items-center relative text-white">
      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
        JobTracking System 
      </h1>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={onAdd}
          className="bg-gradient-to-r from-green-400 to-blue-500 px-5 py-2 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
        >
          + Add Job
        </button>

        <button className="border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-purple-700 transition-colors">
          Logout
        </button>

        {userImage ? (
          <img
            src={userImage}
            alt="User"
            className="w-12 h-12 rounded-full object-cover border-2 border-white hover:ring-4 hover:ring-green-300 transition-all"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-black">
            U
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" />
          ) : (
            <FaBars className="text-2xl cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 bg-white text-black shadow-lg rounded-md flex flex-col w-44 mt-2 z-50 overflow-hidden animate-slide-down">
          <button
            onClick={onAdd}
            className="px-4 py-2 hover:bg-gray-200 text-left font-medium"
          >
            + Add Job
          </button>
          <button className="px-4 py-2 hover:bg-gray-200 text-left font-medium">
            Logout
          </button>
          <div className="flex items-center px-4 py-2 gap-2 hover:bg-gray-200">
            {userImage ? (
              <img
                src={userImage}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                U
              </div>
            )}
            <span className="font-medium">Profile</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
