import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyModal from './components/PrivacyModal';
import ToastProvider from './components/ToastProvider';
import useUiStore from './store/uiStore';

export default function App() {
  const { theme } = useUiStore();

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
