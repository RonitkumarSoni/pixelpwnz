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

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <ScrollHandler />
      <ToastProvider />
      <PrivacyModal />
      {/* Global Ambient Glassmorphism Background Orbs */}
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-secondary" />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
