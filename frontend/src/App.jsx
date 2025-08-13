// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
// import BatchProcess from './pages/BatchProcess';
// import ApiDocs from './pages/ApiDocs';
// import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Styles
import './styles/globals.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700">
            <Navbar />
            
            <main className="pt-20 min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                {/* <Route path="/batch" element={<BatchProcess />} /> */}
                {/* <Route path="/api" element={<ApiDocs />} /> */}
                {/* <Route path="/settings" element={<Settings />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            <Footer />
            
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;