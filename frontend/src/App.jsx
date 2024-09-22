import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AiAssist from './pages/AI assist/AiAssist';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Profile from './pages/Profile/Profile';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/ai-assist" element={<AiAssist />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
