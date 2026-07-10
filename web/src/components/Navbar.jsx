import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <Link to="/login">
          <button className="btn btn-nav-cta" style={{ padding: '12px 28px' }}>
            Get Started <ArrowRight size={16} />
          </button>
        </Link>
      </nav>
    </div>
  );
}
