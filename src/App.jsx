import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginSignup from './pages/Login/LoginSignup';
import HomePage from './pages/Home/HomePage';
import AiAssist from './pages/AI assist/AiAssist';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <LoginSignup onLogin={handleLogin} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ai-assist" element={<AiAssist />} />
      </Routes>
    </Router>
  );
}

export default App;
