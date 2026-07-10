import { Link } from 'react-router-dom';
import { MessageSquare, Lock, Zap, Sparkles, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%', 
      background: 'rgba(108, 92, 231, 0.03)',
      padding: '40px 24px',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      position: 'relative', 
      overflow: 'hidden' 
    }}>

      {/* Absolute Logo (Like Front Page) */}
      <Link to="/" className="desktop-logo-outside" style={{ position: 'absolute', top: 32, left: 40, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>S</div>
        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Signet</span>
      </Link>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        height: 680,
        background: '#fff',
        borderRadius: 24,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 30px 60px rgba(108, 92, 231, 0.08)',
        overflow: 'hidden'
      }}>

      {/* Left Panel (Branding) - Hidden on Mobile */}
      <div className="login-left-panel" style={{
        position: 'absolute',
        top: 0,
        left: isLogin ? '0%' : '55%',
        width: '45%',
        height: '100%',
        background: '#f9fafb',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: isLogin ? '1px solid var(--glass-border)' : 'none',
        borderLeft: !isLogin ? '1px solid var(--glass-border)' : 'none',
        transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 2
      }}>

        <div style={{ zIndex: 10, position: 'relative', flexGrow: 1, marginTop: 40 }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.02em' }}>
            {isLogin ? (
              <>Your conversations.<br /><span style={{ color: 'var(--color-primary)' }}>Your AI.</span></>
            ) : (
              <>Start your<br /><span style={{ color: 'var(--color-primary)' }}>journey.</span></>
            )}
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1.05rem', marginBottom: 32, maxWidth: 360, lineHeight: 1.6 }}>
            {isLogin 
              ? "Create a personalized AI clone that talks just like the people who matter."
              : "Join thousands of users who have cloned their chat personalities with Signet."}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageSquare size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Personalized AI Clone</h4>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, margin: 0, maxWidth: 280 }}>Upload your chats and create an AI that reflects their tone, style, and personality.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Lock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Private & Secure</h4>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, margin: 0, maxWidth: 280 }}>Your data is end-to-end encrypted and never shared with anyone.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Panel (Login Form) */}
      <div className="auth-form-panel" style={{
        position: 'absolute',
        top: 0,
        left: isLogin ? '45%' : '0%',
        width: '55%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        background: '#fff',
        transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1
      }}>

        {/* Mobile Logo */}
        <Link to="/" className="login-mobile-logo" style={{ position: 'absolute', top: 32, left: 24, textDecoration: 'none', display: 'none', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16 }}>S</div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>Signet</span>
        </Link>

        <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', minHeight: 'auto', justifyContent: 'center' }}>

          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: 8, letterSpacing: '-0.02em' }}>
                {isLogin ? "Welcome back 👋" : "Create an account "}
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                {isLogin ? "Log in to continue to your account" : "Sign up to start creating your AI clones"}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              <button style={{
                width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: 600, color: '#374151', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: 20, height: 20 }} />
                Continue with Google
              </button>

              <button style={{
                width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: 600, color: '#374151', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: 18, height: 20 }} />
                Continue with Apple
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
              <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: 8 }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB',
                      fontSize: '0.9rem', outline: 'none', color: '#111827', boxSizing: 'border-box',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB',
                    fontSize: '0.9rem', outline: 'none', color: '#111827', boxSizing: 'border-box',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Password</label>
                  {isLogin && <a href="#" style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Forgot?</a>}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB',
                      fontSize: '0.9rem', outline: 'none', color: '#111827', paddingRight: 40, boxSizing: 'border-box',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                    }}
                  />
                  <EyeOff size={16} color="#9CA3AF" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
                </div>
              </div>

              {isLogin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <input type="checkbox" id="remember" style={{ width: 14, height: 14, accentColor: 'var(--color-primary)', cursor: 'pointer', borderRadius: 4, border: '1px solid #D1D5DB' }} />
                  <label htmlFor="remember" style={{ fontSize: '0.8rem', color: '#4B5563', cursor: 'pointer' }}>Remember me</label>
                </div>
              )}

              <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 8, fontSize: '0.95rem', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 8, boxShadow: '0 4px 12px rgba(108, 92, 231, 0.2)' }}>
                {isLogin ? 'Log in' : 'Sign up'} <ArrowRight size={16} />
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#4B5563', marginTop: 16, marginBottom: 24 }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

          {/* Security Badge Pushed to Bottom */}
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={18} />
              </div>
              <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: 0, lineHeight: 1.5, textAlign: 'left' }}>
                Your data is private and secure.<br />We never store or share your chats.
              </p>
            </div>
          </div>

        </div>
      </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-logo-outside {
            display: none !important;
          }
          .login-left-panel {
            display: none !important;
          }
          .login-mobile-logo {
            display: flex !important;
          }
          .auth-form-panel {
            width: 100% !important;
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
