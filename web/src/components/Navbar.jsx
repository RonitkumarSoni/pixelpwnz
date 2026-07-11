import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import useUiStore from '../store/uiStore';

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUiStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      padding: isScrolled ? '12px 24px' : '24px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none', // so clicks outside the pill pass through
    }}>
      <nav style={{
        pointerEvents: 'auto',
        width: '100%',
        maxWidth: 1180,
        background: isScrolled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'saturate(180%) blur(24px)',
        WebkitBackdropFilter: 'saturate(180%) blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 99,
        boxShadow: isScrolled ? '0 12px 40px rgba(108, 92, 231, 0.12)' : '0 4px 20px rgba(108, 92, 231, 0.05)',
        padding: '10px 10px 10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <img src="/logo.png" alt="Signet Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span>Signet</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link to="/#how-it-works">How It Works</Link></li>
          <li><Link to="/demo">Demo</Link></li>
          <li><Link to="/#privacy">Privacy</Link></li>
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/docs">Docs</Link></li>
        </ul>
        {user ? (
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)',
              cursor: 'pointer'
            }}>
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-get-started">
              Get Started
              <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                </svg>
              </div>
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}
