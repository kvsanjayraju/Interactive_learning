import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CryptoLandingPage from './components/CryptoLandingPage';
import RSALesson from './components/RSALesson';
import AESLesson from './components/AESLesson';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/crypto" element={<CryptoLandingPage />} />
        <Route path="/crypto/rsa" element={<RSALesson />} />
        <Route path="/crypto/aes" element={<AESLesson />} />
        <Route path="*" element={<Navigate to="/crypto" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
