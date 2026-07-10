import { Link } from 'react-router-dom';
import { GitBranch, Hash, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 80, padding: '60px 24px', borderTop: '1px solid var(--glass-border)',
      background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
      position: 'relative', zIndex: 5,
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20 }}>S</div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Signet</span>
        </div>
        
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: 40, textAlign: 'center', maxWidth: 400 }}>
          Your digital twin, powered by your chat history.
        </p>
        
        <div style={{ display: 'flex', gap: 32, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#how-it-works" className="footer-link">How It Works</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#docs" className="footer-link">Docs</a>
          <a href="#faq" className="footer-link">FAQ</a>
        </div>

        {/* Social Icons matching user's requested style */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
          <button className="social-glass-btn">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter">
              <Hash size={28} id="twitter-icon" />
            </a>
          </button>
          
          <button className="social-glass-btn">
            <a href="https://github.com/signet-team/signet" target="_blank" rel="noreferrer" title="GitHub">
              <GitBranch size={28} id="github-icon" />
            </a>
          </button>

          <button className="social-glass-btn">
            <a href="#" target="_blank" rel="noreferrer" title="Discord">
              <MessageCircle size={28} id="discord-icon" />
            </a>
          </button>
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Signet Team. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
