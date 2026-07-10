import { Upload, FileSearch, BrainCircuit, MessageSquare, BarChart2, ShieldCheck, Lock, CloudLightning, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorksSection() {
  const steps = [
    { num: '01', icon: <Upload size={28} />, title: 'Upload Your Chat', desc: 'Upload your exported chat file from any platform. We support multiple formats.', badge: '.txt, .json, .zip supported' },
    { num: '02', icon: <FileSearch size={28} />, title: 'We Process It', desc: 'Our AI extracts messages, analyzes patterns, tone, and the way they communicate.', badge: 'Secure & Private' },
    { num: '03', icon: <BrainCircuit size={28} />, title: 'AI Learns & Clones', desc: 'Advanced AI models learn their unique style, tone, vocabulary, and personality.', badge: 'Your AI Clone is Ready' },
    { num: '04', icon: <MessageSquare size={28} />, title: 'Start Chatting', desc: 'Chat with your AI clone that replies just like them. Feel the real connection.', badge: 'Realistic Responses' },
    { num: '05', icon: <BarChart2 size={28} />, title: 'Insights & Analytics', desc: 'Get deep insights into their chatting behavior, patterns, and personality.', badge: 'Smart Analytics' }
  ];

  return (
    <section id="how-it-works" style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px', position: 'relative', zIndex: 5 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="tag" style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 16 }}>✦</span> Simple. Secure. Intelligent.
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>
          How Signet <span className="gradient-text">Works</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
          From your chat history to a personalized AI clone in just a few simple steps.<br />
          Private, secure, and 100% you.
        </p>
      </div>
      
      {/* Horizontal Steps Layout */}
      <div className="how-it-works-grid" style={{ position: 'relative', marginBottom: 60 }}>
        {/* Dotted connector line for desktop */}
        <div className="steps-connector-line" style={{
          position: 'absolute', top: '35%', left: '5%', right: '5%',
          height: 2, borderBottom: '2px dashed rgba(108, 92, 231, 0.3)',
          zIndex: 0
        }}></div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24, position: 'relative', zIndex: 1
        }}>
          {steps.map((step) => (
            <div key={step.num} className="glass-card step-card" style={{
              flexDirection: 'column', textAlign: 'center', padding: '40px 20px 30px',
              position: 'relative', background: 'var(--color-surface)',
              alignItems: 'center', justifyContent: 'space-between', height: '100%'
            }}>
              {/* Top Number Badge */}
              <div style={{
                position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.4)'
              }}>
                {step.num}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(139, 124, 247, 0.05))',
                  color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24, boxShadow: 'inset 0 0 20px rgba(108, 92, 231, 0.05)'
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text)' }}>{step.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24 }}>{step.desc}</p>
              </div>

              {/* Bottom Badge */}
              <div style={{
                background: 'rgba(108, 92, 231, 0.08)', color: 'var(--color-primary)',
                padding: '6px 14px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600, width: '100%'
              }}>
                {step.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Panel */}
      <div className="glass-badge" style={{
        padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 40, marginBottom: 60, alignItems: 'start'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>Privacy First</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Your data never leaves your device. We never store your conversations.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Lock size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>100% Secure</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>End-to-end encrypted processing keeps your conversations safe.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CloudLightning size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>Lightning Fast</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Get your AI clone ready in just a few minutes.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Link to="/upload">
          <button className="btn btn-primary" style={{ padding: '16px 32px' }}>
            Create Your AI Clone <ArrowRight size={18} />
          </button>
        </Link>
        <a href="#demo" style={{ textDecoration: 'none' }}>
          <button className="btn btn-ghost" style={{ padding: '16px 32px' }}>
            <Play size={18} fill="#6C5CE7" color="#6C5CE7" /> Watch Demo
          </button>
        </a>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .steps-connector-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
