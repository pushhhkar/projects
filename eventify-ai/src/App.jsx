// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutUsPage from './pages/AboutUsPage';

// --- Your 3 New Pages ---
import DashboardPage from './pages/DashboardPage'; // Your new Home Page
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* --- Dashboard replaces HomePage --- */}
        <Route path="/" element={<DashboardPage />} />
        
        {/* --- New Routes --- */}
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />

        {/* --- Auth & Static Routes --- */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;



