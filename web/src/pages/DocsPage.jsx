import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ChevronRight, Shield, CloudUpload, Cpu, GraduationCap, User, Copy, CheckCircle2, LifeBuoy, Apple, Play } from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('cURL');
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = {
    'GETTING STARTED': ['Introduction', 'Quick Start', 'Your First AI Clone'],
    'ACCOUNT & SETTINGS': ['Creating an Account', 'Profile & Preferences', 'Data & Privacy Settings', 'Billing & Subscription'],
    'USING SIGNET': ['Upload Your Chat', 'AI Processing', 'Smart Learning', 'Your AI Clone', 'Conversations', 'Insights & Analytics'],
    'ADVANCED': ['Customization', 'Export & Import', 'Integrations (Coming Soon)', 'API (Coming Soon)'],
    'RESOURCES': ['FAQ', 'Troubleshooting', 'Best Practices', 'Release Notes', 'Changelog']
  };

  const StepBadge = ({ icon: Icon, title, desc }) => (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', background: 'rgba(108, 92, 231, 0.03)', border: '1px solid var(--glass-border)', borderRadius: '16px', flex: 1 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Icon size={24} color="var(--color-primary)" />
      </div>
      <h4 style={{ fontSize: '1.05rem', marginBottom: 8, fontWeight: 700, color: 'var(--color-text)' }}>{title}</h4>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--color-background)', overflow: 'hidden' }}>
      {/* Top Navigation */}
      <div style={{ height: 64, borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 24px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50, gap: 24 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--color-text)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden' }}>
            <img src="/logo.png" alt="Signet Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Signet</span>
        </Link>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 600 }}>
            <Search size={16} color="var(--color-text-secondary)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search documentation..." 
              style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--color-background)', fontSize: '0.9rem', color: 'var(--color-text)', outline: 'none' }} 
            />
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
              <kbd style={{ background: 'var(--glass-border)', padding: '2px 6px', borderRadius: 4, fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontFamily: 'inherit' }}>Ctrl</kbd>
              <kbd style={{ background: 'var(--glass-border)', padding: '2px 6px', borderRadius: 4, fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontFamily: 'inherit' }}>K</kbd>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: 280, borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', background: 'rgba(255, 255, 255, 0.3)' }}>
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
            {Object.entries(navLinks).map(([section, links]) => (
              <div key={section}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 12, letterSpacing: '0.05em' }}>{section}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {links.map((link) => (
                    <button 
                      key={link}
                      onClick={() => setActiveCategory(link)}
                      style={{ 
                        textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', background: activeCategory === link ? 'rgba(108, 92, 231, 0.08)' : 'transparent',
                        color: activeCategory === link ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontWeight: activeCategory === link ? 600 : 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', gap: 8
                      }}
                    >
                      {activeCategory === link && <div style={{ width: 4, height: 16, background: 'var(--color-primary)', borderRadius: 2 }} />}
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Need Help Card */}
          <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)' }}>
            <div style={{ background: 'rgba(108, 92, 231, 0.03)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <LifeBuoy size={18} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>Need help?</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Can't find what you're looking for?
              </p>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '0.85rem', color: 'var(--color-primary)', background: 'white', border: '1px solid var(--glass-border)' }}>
                Contact Support →
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px 60px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: 24 }}>
              <Home size={14} />
              <span>/</span>
              <span>Getting Started</span>
              <span>/</span>
              <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>Introduction</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 24, letterSpacing: '-0.02em' }}>Introduction</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 40 }}>
              Signet helps you create a personalized AI clone from your chat history. Your clone reflects your unique tone, style, and personality — so conversations feel natural and truly personal.
            </p>

            {/* What is Signet Callout */}
            <div style={{ background: 'rgba(108, 92, 231, 0.05)', border: '1px solid rgba(108, 92, 231, 0.1)', borderRadius: 16, padding: '24px 32px', display: 'flex', gap: 20, marginBottom: 64 }}>
              <div style={{ marginTop: 2, color: 'var(--color-primary)' }}>
                <Shield size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>What is Signet?</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                  Signet is your AI clone that learns from your conversations and responds like you. It's private, secure, and 100% yours.
                </p>
              </div>
            </div>

            {/* How It Works Grid */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>How It Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 64 }}>
              <StepBadge icon={CloudUpload} title="Upload Your Chat" desc="Upload your exported chat from any platform." />
              <StepBadge icon={Cpu} title="AI Processing" desc="We analyze tone, pattern, and style from your chats." />
              <StepBadge icon={GraduationCap} title="Smart Learning" desc="Our AI learns your unique way of communication." />
              <StepBadge icon={User} title="Your AI Clone" desc="Talks like you. Responds like you." />
            </div>

            {/* Quick Example */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>Quick Example</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: 24 }}>Create your AI clone in just a few lines. <span style={{ color: 'var(--color-primary)' }}>(Coming Soon)</span></p>
            
            <div style={{ border: '1px solid var(--glass-border)', borderRadius: 16, overflow: 'hidden', marginBottom: 64, background: '#fff' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', padding: '0 8px' }}>
                {['cURL', 'JavaScript', 'Python'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ 
                      padding: '16px 20px', background: 'transparent', border: 'none',
                      fontWeight: activeTab === tab ? 600 : 500,
                      color: activeTab === tab ? 'var(--color-text)' : 'var(--color-text-secondary)',
                      borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                      cursor: 'pointer', fontSize: '0.9rem'
                    }}
                  >
                    {tab}
                  </button>
                ))}
                <button onClick={handleCopy} style={{ marginLeft: 'auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ margin: 0, padding: 32, background: 'rgba(108, 92, 231, 0.02)', overflowX: 'auto', color: '#333', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {activeTab === 'cURL' && `curl -X POST https://api.signet.ai/v1/clone \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
        "name": "My AI Clone",
        "chat_file_url": "https://example.com/chat.json"
      }'`}
                {activeTab === 'JavaScript' && `fetch('https://api.signet.ai/v1/clone', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "My AI Clone",
    chat_file_url: "https://example.com/chat.json"
  })
});`}
                {activeTab === 'Python' && `import requests

requests.post(
    "https://api.signet.ai/v1/clone",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "name": "My AI Clone",
        "chat_file_url": "https://example.com/chat.json"
    }
)`}
              </pre>
            </div>

            {/* Best Practices & Take Signet With You Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 64, paddingBottom: 100 }}>
              
              {/* Best Practices */}
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>Best Practices</h2>
                <div style={{ background: 'rgba(108, 92, 231, 0.03)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40 }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[
                      "Use high-quality chat exports for better results.",
                      "The more conversations, the more accurate your clone.",
                      "Review and refine your clone by chatting with it.",
                      "Keep your data private and secure."
                    ].map((text, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckCircle2 size={14} />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>
                  <div style={{ flexShrink: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(108, 92, 231, 0.2) 0%, rgba(108,92,231,0) 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder for 3D shield illustration */}
                    <div style={{ width: 120, height: 140, background: 'linear-gradient(135deg, #a8a4f6, #6c5ce7)', borderRadius: '24px 24px 64px 64px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(108, 92, 231, 0.3)', position: 'relative' }}>
                      <CheckCircle2 size={64} color="white" strokeWidth={1.5} />
                      <div style={{ position: 'absolute', right: -20, bottom: 20, width: 24, height: 24, borderRadius: '50%', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <div style={{ position: 'absolute', left: -10, top: 40, width: 16, height: 16, borderRadius: '50%', background: 'rgba(108,92,231,0.5)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Download App */}
              <div style={{ padding: '48px 64px', textAlign: 'center', background: 'rgba(108, 92, 231, 0.03)', borderRadius: 24, border: '1px solid var(--glass-border)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: 16, fontWeight: 700, color: 'var(--color-text)' }}>Download the Signet App</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: 40 }}>
                  Chat with your AI clone anytime, anywhere.
                </p>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px', background: 'white', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', minWidth: 280, border: '1px solid var(--glass-border)', cursor: 'pointer' }} className="hover-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Google_Play_2022_logo.svg" alt="Google Play" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#111827' }}>Android App</div>
                      <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Get it on Google Play</div>
                      <div style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 700 }}>Download →</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px', background: 'white', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', minWidth: 280, border: '1px solid var(--glass-border)', cursor: 'pointer' }} className="hover-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Logo" style={{ width: 72, height: 72, objectFit: 'contain' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#111827' }}>iOS App</div>
                      <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Download on the App Store</div>
                      <div style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 700 }}>Download →</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .hover-card:hover {
          box-shadow: 0 12px 24px rgba(108, 92, 231, 0.08);
          transform: translateY(-2px);
          border-color: rgba(108, 92, 231, 0.3);
        }
      `}</style>
    </div>
  );
}
