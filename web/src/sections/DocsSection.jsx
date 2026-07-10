import { Terminal, Database } from 'lucide-react';

export default function DocsSection() {
  return (
    <section id="docs" style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Documentation</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto' }}>
          A lightweight technical reference for anyone who wants to see under the hood.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Terminal size={24} color="var(--color-primary)" />
        <h3 style={{ fontSize: '1.75rem', margin: 0 }}>Quickstart</h3>
      </div>
      <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '32px', marginBottom: 60 }}>
        <ol style={{ paddingLeft: 20, margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: 'var(--color-text)' }}>Clone the repo:</strong><br />
            <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono, monospace)' }}>git clone https://github.com/signet-team/signet.git</code>
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: 'var(--color-text)' }}>Start ChromaDB:</strong><br />
            Run <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono, monospace)' }}>docker-compose up -d</code> in the root directory.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: 'var(--color-text)' }}>Start the Backend:</strong><br />
            Configure <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono, monospace)' }}>.env</code> in the <code>backend</code> folder, then run <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono, monospace)' }}>npm install && npm run dev</code>.
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>Start the Web App:</strong><br />
            Navigate to the <code>web</code> folder and run <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono, monospace)' }}>npm install && npm run dev</code>.
          </li>
        </ol>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Database size={24} color="var(--color-primary)" />
        <h3 style={{ fontSize: '1.75rem', margin: 0 }}>API Reference</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* API Endpoints */}
        <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none' }}>POST</span>
            <code style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>/api/upload</code>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>Uploads a WhatsApp .txt file and populates the vector store.</p>
        </div>
        <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none' }}>POST</span>
            <code style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>/api/chat</code>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>Send a message to the AI clone, providing session ID and temperature.</p>
        </div>
        <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', border: 'none' }}>GET</span>
            <code style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>/api/stats/:sessionId</code>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>Retrieve analytics and metrics about the parsed chat data.</p>
        </div>
        <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="tag" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'none' }}>DELETE</span>
            <code style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>/api/session/:sessionId</code>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>Purge the session from memory and delete the associated ChromaDB collection.</p>
        </div>
      </div>
    </section>
  );
}
