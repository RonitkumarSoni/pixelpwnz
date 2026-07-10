import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 40, padding: '40px 24px 20px 24px', borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-color)',
      position: 'relative', zIndex: 5,
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        
        {/* Main Footer Content */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', marginBottom: 40 }}>
          
          {/* Left Side: Logo, Text, Socials & Subscribe */}
          <div style={{ flex: '1 1 500px', maxWidth: 650 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>S</div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>Signet</span>
            </div>
            
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', fontWeight: 600, marginBottom: 12 }}>
              Your conversations.<br/>Your AI.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 24, maxWidth: 320 }}>
              Signet helps you create a personalized AI clone from your chat history — private, secure, and built to reflect the way you truly talk.
            </p>
            
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="social-glass-btn" style={{ width: 44, height: 44 }}>
                  <a href="#" target="_blank" rel="noreferrer" title="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                </button>
                
                <button className="social-glass-btn" style={{ width: 44, height: 44 }}>
                  <a href="#" target="_blank" rel="noreferrer" title="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                </button>
                
                <button className="social-glass-btn" style={{ width: 44, height: 44 }}>
                  <a href="#" target="_blank" rel="noreferrer" title="X (Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                  </a>
                </button>

                <button className="social-glass-btn" style={{ width: 44, height: 44 }}>
                  <a href="#" target="_blank" rel="noreferrer" title="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </button>

                <button className="social-glass-btn" style={{ width: 44, height: 44 }}>
                  <a href="#" target="_blank" rel="noreferrer" title="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                </button>
              </div>

              {/* Stay Updated */}
              <div style={{ flex: 1, minWidth: 260 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 12, color: 'var(--color-text)' }}>Stay Updated</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 12 }}>
                  Subscribe to get tips, product updates, and the latest news from Signet.
                </p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--glass-border)', background: 'white', outline: 'none', fontSize: '0.9rem' }} />
                  <button className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: 8, fontSize: '0.9rem' }}>Subscribe</button>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Link Columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, flex: '2 1 500px', justifyContent: 'space-between' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 120 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Product</h4>
              <Link to="/#how-it-works" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>How It Works</Link>
              <Link to="/upload" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Create Clone</Link>
              <Link to="/chat" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Chat Interface</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 120 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Resources</h4>
              <Link to="/docs" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Documentation</Link>
              <Link to="/#faq" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>FAQ</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 120 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Company</h4>
              <Link to="/#about" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
              <Link to="/security" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Security</Link>
              <Link to="/#privacy" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 120 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Support</h4>
              <a href="mailto:hello@signet.ai" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</a>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, borderTop: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap', gap: 16 }}>
          <div>© {new Date().getFullYear()} Signet. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
            <span>|</span>
            <Link to="/#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={16} />
            <span>Your data is private and secure.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
