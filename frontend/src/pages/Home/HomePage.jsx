import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUser, FaCog, FaLayerGroup, FaHome, FaRobot } from 'react-icons/fa';
import BottomNav from '../../components/BottomNav';

const doctors = [
  {
    id: 1,
    name: "Dr. Aarav Patel",
    specialization: "Small Animal Veterinarian",
  },
  {
    id: 2,
    name: "Dr. Meera Sharma",
    specialization: "Large Animal Veterinarian",
  },
  { id: 3, name: "Dr. Vikram Singh", specialization: "Equine Veterinarian" },
  {
    id: 4,
    name: "Dr. Kavita Nair",
    specialization: "Veterinary Dermatologist",
  },
  { id: 5, name: "Dr. Rohan Desai", specialization: "Veterinary Oncologist" },
  {
    id: 6,
    name: "Dr. Anjali Iyer",
    specialization: "Veterinary Anesthesiologist",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        {/* Left Icon (e.g., User Profile) */}
        <div
          className="p-3 bg-blue-500 rounded-full cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <FaUser className="text-white text-2xl" />
        </div>

        {/* Right Icon (e.g., Settings) */}
        <div className="p-3 bg-gray-200 rounded-full cursor-pointer">
          <FaLayerGroup className="text-gray-700 text-2xl" />
        </div>
      </div>
      
      {/* Doctors List Section */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center mb-6">List of Doctors</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white shadow-md rounded-lg p-4 text-center"
              >
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default HomePage;
