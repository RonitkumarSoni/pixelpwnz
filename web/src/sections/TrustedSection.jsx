import { Shield, UserCheck, BarChart3, Lock, Zap } from 'lucide-react';

export default function TrustedSection() {
  return (
    <section id="trusted" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 60px', position: 'relative', zIndex: 5 }}>
      <div className="badge-section">
        <div className="glass-badge">
          <div className="glass-badge-icon"><Shield size={22} /></div>
          <div><h4>Privacy First</h4><p>Your chats stay on<br />your device.</p></div>
        </div>
        <div className="glass-badge">
          <div className="glass-badge-icon"><Zap size={22} /></div>
          <div><h4>Fast Processing</h4><p>Local embeddings<br />in milliseconds.</p></div>
        </div>
        <div className="glass-badge">
          <div className="glass-badge-icon"><UserCheck size={22} /></div>
          <div><h4>Local AI</h4><p>Uses on-device memory<br />for processing.</p></div>
        </div>
        <div className="glass-badge">
          <div className="glass-badge-icon"><Lock size={22} /></div>
          <div><h4>100% Secure</h4><p>We never store or share<br />your data.</p></div>
        </div>
      </div>
    </section>
  );
}
