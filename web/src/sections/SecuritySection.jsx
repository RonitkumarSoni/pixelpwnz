import { ShieldAlert, Cpu, Trash2 } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section id="security" style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div className="glass-card" style={{ padding: '60px 40px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: 16 }}>Enterprise-Grade <span style={{ color: '#EF4444' }}>Security</span></h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto' }}>Your personal data requires absolute protection. We built Signet with strict security constraints.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <ShieldAlert size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Encrypted Transfer</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>All communications between your device and the parsing engine are encrypted via SSL/TLS.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Cpu size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Local Vector DB</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>Your chat embeddings are stored in a localized ChromaDB instance that is isolated per session.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Trash2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Hard Delete</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>Clearing your session instantly drops the database collection and purges all memory caches.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
