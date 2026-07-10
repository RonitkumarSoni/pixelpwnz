import { Upload, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section id="cta" style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div className="glass-card" style={{ 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '60px 40px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(139, 124, 247, 0.05))',
        border: '1px solid rgba(108, 92, 231, 0.3)'
      }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Sparkles size={32} />
        </div>
        <h2 style={{ fontSize: '3rem', marginBottom: 20 }}>Ready to meet your <span className="gradient-text">Clone?</span></h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 500, marginBottom: 40, lineHeight: 1.6 }}>
          It takes less than a minute. Export a chat, upload it safely, and start chatting with your AI counterpart.
        </p>
        <Link to="/upload" style={{ textDecoration: 'none' }}>
          <button className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <Upload size={20} /> Create Your Clone Now
          </button>
        </Link>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 24 }}>
          No credit card required. 100% free and private.
        </p>
      </div>
    </section>
  );
}
