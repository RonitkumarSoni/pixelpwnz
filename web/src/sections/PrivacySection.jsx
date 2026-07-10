import { Lock, FileText, ShieldCheck, User, Database, MessageSquare, Trash2, EyeOff, Server, Shield, Globe, RefreshCcw } from 'lucide-react';

export default function PrivacySection() {
  const cards = [
    { icon: <ShieldCheck size={28} />, title: 'Local & Secure Processing', desc: 'Your data is processed securely using advanced models. We don\'t rely on third-party LLMs to store your conversations.' },
    { icon: <Lock size={28} />, title: 'End-to-End Encryption', desc: 'All data is encrypted during upload, processing, and storage. Only you can access your AI clone.' },
    { icon: <Trash2 size={28} />, title: "You're In Control", desc: 'Delete your data anytime. Once deleted, it\'s gone permanently from our systems.' },
    { icon: <EyeOff size={28} />, title: 'No Data Sharing', desc: 'We never sell or share your data with anyone. Ever. No exceptions.' },
    { icon: <Server size={28} />, title: 'Minimal Data Retention', desc: 'We retain data only for as long as necessary to deliver the service you use.' }
  ];

  return (
    <section id="privacy" style={{ position: 'relative', padding: '100px 0', overflow: 'hidden' }}>
      <div className="bg-dots" />
      
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        {/* Top Hero Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 100 }}>
          {/* Left Text */}
          <div>
            <div className="badge" style={{ marginBottom: 24, padding: '8px 16px', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 99, fontSize: '0.85rem', fontWeight: 600 }}>
              <Lock size={14} /> Your Privacy, Our Priority
            </div>
            
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
              Privacy Built In.<br />
              <span className="gradient-text">Trust</span> Earned.
            </h2>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
              At Signet, your conversations are yours — always.<br />
              We never store, sell, or share your data. Ever.
            </p>
            
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <button className="btn btn-primary" style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Lock size={18} /> Learn How We Protect You
              </button>
              <button className="btn btn-ghost" style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={18} color="var(--color-primary)" /> Read Policy
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
              <ShieldCheck size={18} color="var(--color-primary)" />
              We follow industry-standard security practices.
            </div>
          </div>
          
          {/* Right Graphic */}
          <div className="privacy-graphic-container" style={{ position: 'relative', height: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Orbital Rings */}
            <div className="orbital-ring" style={{ position: 'absolute', width: '120%', height: '70%', border: '1px solid rgba(108, 92, 231, 0.2)', borderRadius: '50%', transform: 'rotate(20deg)', pointerEvents: 'none' }} />
            <div className="orbital-ring-2" style={{ position: 'absolute', width: '90%', height: '100%', border: '1px solid rgba(108, 92, 231, 0.15)', borderRadius: '50%', transform: 'rotate(-20deg)', pointerEvents: 'none' }} />
            
            {/* Base Shield Shadow/Glow */}
            <div className="shield-glow" style={{ position: 'absolute', width: 200, height: 200, background: 'var(--color-primary)', filter: 'blur(80px)', opacity: 0.3 }} />

            {/* Shield Construction */}
            <div className="shield-main" style={{
              position: 'relative', width: 240, height: 280,
              background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)',
              clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 0 40px rgba(255,255,255,0.4)',
              zIndex: 10
            }}>
              <div style={{
                width: 210, height: 250,
                background: 'linear-gradient(135deg, #6C5CE7, #3728A1)',
                clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
              }}>
                <Lock size={72} color="white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Floating Glass Badges */}
            <div className="glass-card floating-badge" style={{ position: 'absolute', top: '15%', left: '5%', width: 48, height: 48, padding: 0, justifyContent: 'center', zIndex: 11, borderRadius: '50%' }}><User size={20} color="var(--color-primary)" /></div>
            <div className="glass-card floating-badge" style={{ position: 'absolute', top: '5%', right: '15%', width: 48, height: 48, padding: 0, justifyContent: 'center', zIndex: 11, borderRadius: '50%' }}><Database size={20} color="var(--color-primary)" /></div>
            <div className="glass-card floating-badge" style={{ position: 'absolute', bottom: '25%', left: '-5%', width: 48, height: 48, padding: 0, justifyContent: 'center', zIndex: 11, borderRadius: '50%' }}><MessageSquare size={20} color="var(--color-primary)" /></div>
            <div className="glass-card floating-badge" style={{ position: 'absolute', bottom: '30%', right: '5%', width: 48, height: 48, padding: 0, justifyContent: 'center', zIndex: 11, borderRadius: '50%' }}><ShieldCheck size={20} color="var(--color-primary)" /></div>
          </div>
        </div>

        {/* 5 Column Cards Section */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>How We Keep You Safe</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>Privacy isn't a feature — it's our foundation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginBottom: 60 }}>
          {cards.map((card, idx) => (
            <div key={idx} className="glass-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 16px', background: 'var(--color-surface)', height: '100%' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(108, 92, 231, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                {card.icon}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{card.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, padding: 40, alignItems: 'center', background: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 24px rgba(108, 92, 231, 0.3)' }}>
              <Shield size={32} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>Our Commitment</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                We believe privacy is a fundamental human right. That's why we built Signet to be private by design — from the ground up.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--color-primary)', marginTop: 2 }}><User size={20} /></div>
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>You Own Your Data</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Your conversations belong to you, always.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--color-primary)', marginTop: 2 }}><Globe size={20} /></div>
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Transparent Practices</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>We're open about how we handle your data.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--color-primary)', marginTop: 2 }}><RefreshCcw size={20} /></div>
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Always Improving</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>We continuously update our security to keep you safe.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          #privacy > div > div:first-child { grid-template-columns: 1fr !important; text-align: center; }
          #privacy > div > div:first-child > div:first-child > div { justify-content: center; }
          #privacy > div > div:first-child p { margin: 0 auto 32px !important; }
          #privacy > div > div:first-child .btn { justify-content: center; width: 100%; }
          #privacy > div > div:first-child > div:first-child > div:last-child { justify-content: center; margin-top: 24px; }
          
          #privacy > div > div:nth-child(3) { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; }
          #privacy > div > div:last-child { grid-template-columns: 1fr !important; }
          #privacy > div > div:last-child > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
