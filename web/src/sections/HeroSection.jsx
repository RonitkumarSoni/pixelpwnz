import { Link } from 'react-router-dom';
import { Upload, Play, ShieldCheck, MessageCircleMore, Cpu, BrainCircuit, UserCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" style={{
      maxWidth: 1180, margin: '0 auto', padding: '140px 24px 60px',
      display: 'grid', gridTemplateColumns: '1.1fr 1fr', alignItems: 'center', gap: 64,
      minHeight: 'calc(100vh - 240px)', position: 'relative', zIndex: 5,
    }}>
      {/* Left: Text + CTAs */}
      <div>
        <div className="tag" style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 16 }}>✦</span> Your digital twin. Written in your hand.
        </div>
        <h1 style={{ marginBottom: 24 }}>Meet Your<br /><span className="gradient-text">Personal Clone</span></h1>
        <p style={{
          fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--color-text-secondary)',
          maxWidth: 480, marginBottom: 40,
        }}>
          Upload a chat export and Signet learns exactly how you talk. It analyzes your tone, phrase length, and emoji habits to create an authentic replica of your texting style.
        </p>
        <div style={{ display: 'flex', gap: 14, marginBottom: 36 }}>
          <Link to="/upload">
            <button className="btn btn-primary" id="hero-upload-btn">
              <Upload size={18} /> Upload Your Chat
            </button>
          </Link>
          <Link to="/demo" style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost" id="hero-demo-btn">
              <Play size={16} fill="#6C5CE7" color="#6C5CE7" /> Watch Demo
            </button>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <ShieldCheck size={22} color="#6C5CE7" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            Your data stays private and secure.<br />We never store your conversations.
          </p>
        </div>
      </div>

      {/* Right: Signet Bot + Glassmorphism Cards */}
      <div style={{ position: 'relative', height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
        <div className="connector-ring" />
        <div className="connector-ring-outer" />
        
        <div className="connector-dot" style={{ top: '6%', left: '38%' }} />
        <div className="connector-dot" style={{ top: '22%', right: '8%' }} />
        <div className="connector-dot" style={{ bottom: '32%', left: '12%' }} />
        <div className="connector-dot" style={{ bottom: '10%', right: '32%' }} />

        {/* The Robot */}
        <div className="signet-bot">
          <div className="signet-bot-head">
            <div className="signet-bot-ear signet-bot-ear-left" />
            <div className="signet-bot-ear signet-bot-ear-right" />
            <div className="signet-bot-antenna">
              <div className="signet-bot-antenna-ball" />
            </div>
            <div className="signet-bot-face">
              <div className="signet-bot-eyes">
                <div className="signet-bot-eye" />
                <div className="signet-bot-eye" />
              </div>
              <div className="signet-bot-cheek signet-bot-cheek-left" />
              <div className="signet-bot-cheek signet-bot-cheek-right" />
            </div>
          </div>
          <div className="signet-bot-body-wrapper">
            <div className="signet-bot-arm signet-bot-arm-left" />
            <div className="signet-bot-torso">
              <div className="signet-bot-chest-light" />
            </div>
            <div className="signet-bot-arm signet-bot-arm-right" />
          </div>
          <div className="signet-bot-shadow" />
        </div>

        {/* Floating Cards */}
        <div className="glass-card" style={{ position: 'absolute', top: '2%', left: '8%' }}>
          <div className="glass-card-icon"><MessageCircleMore size={18} /></div>
          <div><h4>Your Chat</h4><p>Upload your<br />conversations</p></div>
        </div>
        <div className="glass-card" style={{ position: 'absolute', top: '10%', right: '2%' }}>
          <div className="glass-card-icon"><Cpu size={18} /></div>
          <div><h4>AI Processing</h4><p>We analyze tone,<br />pattern & style</p></div>
        </div>
        <div className="glass-card" style={{ position: 'absolute', bottom: '25%', left: '2%' }}>
          <div className="glass-card-icon"><BrainCircuit size={18} /></div>
          <div><h4>Smart Learning</h4><p>Advanced AI creates<br />your unique clone</p></div>
        </div>
        <div className="glass-card" style={{ position: 'absolute', bottom: '5%', right: '2%' }}>
          <div className="glass-card-icon"><UserCheck size={18} /></div>
          <div><h4>Your AI Clone</h4><p>Talk like you.<br />Respond like you.</p></div>
        </div>
      </div>
    </section>
  );
}
