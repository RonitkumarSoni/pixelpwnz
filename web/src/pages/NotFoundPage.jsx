import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  return (
    <div className="page-enter" style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div className="bg-grid" />
      <Navbar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        padding: '0 20px',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'rgba(108,92,231,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          boxShadow: '0 8px 32px rgba(108, 92, 231, 0.08)'
        }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-primary)' }}>404</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: 16 }}>
          Page Not <span className="gradient-text">Found</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.0625rem', color: 'var(--color-text-secondary)', 
          maxWidth: 400, marginBottom: 32, lineHeight: 1.6
        }}>
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to safety.
        </p>

        <Link to="/">
          <button className="btn btn-primary" style={{ padding: '14px 28px' }}>
            <Home size={18} /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
