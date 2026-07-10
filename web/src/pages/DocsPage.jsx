import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, CloudUpload, Cpu, GraduationCap, User, Copy, CheckCircle2, ChevronRight, Play, Apple } from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('cURL');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StepBadge = ({ icon: Icon, num, title, desc }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={28} color="var(--color-primary)" />
        </div>
        <div style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold', border: '3px solid white' }}>
          {num}
        </div>
      </div>
      <h4 style={{ fontSize: '1.1rem', marginBottom: 8, fontWeight: 700 }}>{title}</h4>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );

  return (
    <div className="page-enter">
      <Navbar />
      
      <div style={{ paddingTop: 140, paddingBottom: 100, maxWidth: 840, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        
        {/* Introduction */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 24, fontWeight: 800 }}>Introduction</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
            Signet helps you create a personalized AI clone from your chat history.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
            Your clone reflects your tone, style, and personality — so conversations feel natural and truly personal.
          </p>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: 32, background: 'rgba(108, 92, 231, 0.05)', border: 'none' }}>
            <div style={{ flexShrink: 0, marginTop: 4 }}>
              <Shield size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 8, fontWeight: 700 }}>Privacy First</h4>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Your data stays with you. We never store, sell, or share your conversations.<br/>
                Signet is private, secure, and 100% yours.
              </p>
            </div>
          </div>
        </section>

        {/* What is Signet */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 16, fontWeight: 700 }}>What is Signet?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
            Signet is your AI clone that learns from your conversations and responds like you.<br/>
            It's private, secure, and built to reflect who you are.
          </p>
          <code style={{ 
            display: 'block', padding: '20px 24px', 
            background: 'rgba(108, 92, 231, 0.05)', 
            color: 'var(--color-primary)',
            borderRadius: 12, fontFamily: 'var(--font-mono, monospace)',
            fontSize: '1rem', border: '1px solid rgba(108, 92, 231, 0.1)'
          }}>
            Your conversations. Your AI. Your way.
          </code>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 16, fontWeight: 700 }}>How It Works</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 40 }}>
            Create your AI clone in four simple steps.
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <StepBadge icon={CloudUpload} num="1" title="Upload Your Chat" desc="Upload your exported chat history from any platform." />
            <StepBadge icon={Cpu} num="2" title="AI Processing" desc="We analyze tone, pattern, and style from your chats." />
            <StepBadge icon={GraduationCap} num="3" title="Smart Learning" desc="Our AI learns your unique way of communication." />
            <StepBadge icon={User} num="4" title="Your AI Clone" desc="Talks like you. Responds like you." />
          </div>
        </section>

        {/* Quick Example */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 16, fontWeight: 700 }}>Quick Example</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
            Create your AI clone using our API (Coming Soon).
          </p>
          
          <div style={{ border: '1px solid var(--glass-border)', borderRadius: 16, overflow: 'hidden' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.02)' }}>
              {['cURL', 'JavaScript', 'Python'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '16px 24px', background: 'transparent', border: 'none',
                    fontWeight: activeTab === tab ? 600 : 400,
                    color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: '0.95rem'
                  }}
                >
                  {tab}
                </button>
              ))}
              <button 
                onClick={handleCopy}
                style={{ marginLeft: 'auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)' }}
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {/* Code */}
            <pre style={{ margin: 0, padding: 32, background: 'rgba(108, 92, 231, 0.03)', overflowX: 'auto', color: 'var(--color-text)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
        </section>

        {/* Best Practices */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 24, fontWeight: 700 }}>Best Practices</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              "Use high-quality chat exports for better results.",
              "The more conversations, the more accurate your clone.",
              "Review and refine your clone by chatting with it.",
              "Keep your data private and secure."
            ].map((text, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>
                <CheckCircle2 size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 24, fontWeight: 700 }}>FAQ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              "Is my data stored on Signet servers?",
              "What file formats are supported?",
              "Can I delete my AI clone?"
            ].map((q, i) => (
              <div key={i} style={{ padding: '24px 32px', border: '1px solid var(--glass-border)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>{q}</span>
                <ChevronRight size={20} color="var(--color-text-secondary)" />
              </div>
            ))}
          </div>
        </section>

        {/* Download App */}
        <section className="glass-card" style={{ padding: '48px 64px', textAlign: 'center', background: 'rgba(108, 92, 231, 0.03)', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 16, fontWeight: 700 }}>Download the Signet App</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: 40 }}>
            Chat with your AI clone anytime, anywhere.
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px', background: 'white', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', minWidth: 280 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Google_Play_2022_logo.svg" alt="Google Play" style={{ width: 80, height: 80, objectFit: 'contain' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem' }}>Android App</div>
                <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Get it on Google Play</div>
                <div style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 700 }}>Download →</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px', background: 'white', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', minWidth: 280 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Logo" style={{ width: 72, height: 72, objectFit: 'contain' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem' }}>iOS App</div>
                <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Download on the App Store</div>
                <div style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 700 }}>Download →</div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
