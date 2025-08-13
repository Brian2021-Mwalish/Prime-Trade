import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Trading from './pages/Trading';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';
import Markets from './pages/Markets';
import Login from './pages/Login';
import BotBuilder from './pages/BotBuilder';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import DisclaimerModal from './components/DisclaimerModal';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted');
    if (hasAcceptedDisclaimer) {
      setShowDisclaimer(false);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <AuthProvider>
      <DisclaimerModal isOpen={showDisclaimer} onAccept={handleAcceptDisclaimer} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="trading" element={<Trading />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="markets" element={<Markets />} />
            <Route path="bot-builder" element={<BotBuilder />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;