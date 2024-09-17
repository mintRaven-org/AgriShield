import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GiTechnoHeart } from "react-icons/gi";


const Login = () => {
  const navigate=useNavigate();
  const [aadhar, setaadhar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/Login", {
        aadhar: aadhar,
        password: password,
        confirmPassword: confirmPassword
      });
      
  
      if (response.status === 200) {
        console.log("Login Successful");
        window.alert("Login Successful");
        navigate("/home");
        
      } else {
        console.log("Invalid credentials");
        window.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      window.alert("Error during Login. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('path-to-your-background-image.jpg')" }}>
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          {/* Logo */}
          <GiTechnoHeart className="h-12 w-12"/>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form method='POST' className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Aadhar No." 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={aadhar}
              onChange={(e) => setaadhar(e.target.value)}
              required 
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {/* Add an eye icon here */}
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {/* Add an eye icon here */}
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </button>
          </div>
          <Link to="/home">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-500 transition duration-300"
          >
            Confirm
          </button>
          </Link>
        </form>
        <p style={{ fontSize: "14px", textAlign: "center", marginTop: "10px" }}>Don't have an Account? <Link to="/">Sign Up</Link></p>
        {/*<div className="mt-6 text-center">
          <button className="border p-2 rounded-lg">
            Select Language
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default Login;