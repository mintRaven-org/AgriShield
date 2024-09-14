import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUser, FaCog, FaLayerGroup, FaHome, FaRobot } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Left Icon (e.g., User Profile) */}
        <div className="p-3 bg-blue-500 rounded-full cursor-pointer" onClick={() => navigate('/profile')}>
          <FaUser className="text-white text-2xl" />
        </div>
        
        {/* Right Icon (e.g., Settings) */}
        <div className="p-3 bg-gray-200 rounded-full cursor-pointer">
          <FaLayerGroup className="text-gray-700 text-2xl" />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex justify-around bg-white py-4 shadow-md rounded-t-lg">
        {/* Notifications Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/notifications')}>
          <FaBell className="text-2xl" />
          <span className="text-xs mt-1">80</span>
        </div>
        
        {/* Home Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/')}>
          <FaHome className="text-2xl" />
        </div>
{/* AI Assist Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/ai-assist')}>
          <FaRobot className="text-2xl" />
          <span className="text-xs mt-1">AI Assist</span>
        </div>

        {/* Profile Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/profile')}>
          <FaUser className="text-2xl" />
        </div>

        

        {/* Settings Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/settings')}>
          <FaCog className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
