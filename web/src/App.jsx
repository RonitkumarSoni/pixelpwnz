import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ChatPage from './pages/ChatPage';
import DocsPage from './pages/DocsPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyModal from './components/PrivacyModal';
import ToastProvider from './components/ToastProvider';
import useUiStore from './store/uiStore';
import DemoPage from './pages/DemoPage';
import SecurityPage from './pages/SecurityPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
import DashboardPage from './pages/DashboardPage';
import CreateNewPage from './pages/CreateNewPage';

import InteractiveDotGrid from './components/InteractiveDotGrid';
import { useAuthStore } from './store/authStore';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { theme } = useUiStore();
  const { checkAuth } = useAuthStore();

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <ScrollHandler />
      <ToastProvider />
      <PrivacyModal />
      <InteractiveDotGrid />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          
          {/* Protected Routes */}
          <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateNewPage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
