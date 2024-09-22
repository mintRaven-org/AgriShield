import React from 'react';
import { FaBell, FaUser, FaCog, FaHome, FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="flex justify-around bg-white py-4 border-2 rounded-t-lg mt-4">
      {/* Notifications Button */}
      <Link
        to="/notifications"
        className="flex flex-col items-center cursor-pointer"
      >
        <FaBell className="text-2xl" />
        <span className="text-xs mt-1">80</span>
      </Link>

      {/* Home Button */}
      <Link to="/" className="flex flex-col items-center cursor-pointer">
        <FaHome className="text-2xl" />
      </Link>

      {/* AI Assist Button */}
      <Link to="/ai-assist" className="flex flex-col items-center cursor-pointer">
        <FaRobot className="text-2xl" />
        <span className="text-xs mt-1">AI Assist</span>
      </Link>

      {/* Profile Button */}
      <Link to="/profile" className="flex flex-col items-center cursor-pointer">
        <FaUser className="text-2xl" />
      </Link>

      {/* Settings Button */}
      <Link to="/settings" className="flex flex-col items-center cursor-pointer">
        <FaCog className="text-2xl" />
      </Link>
    </div>
  );
}

export default BottomNav;
