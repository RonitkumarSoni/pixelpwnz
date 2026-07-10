import React from 'react';
import { Plus, Settings, MessageSquare, Trash2, Edit3, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MY_CLONES = [
  { id: 1, name: "Sales Support Bot", created: "2 days ago", chats: 142, status: "Active" },
  { id: 2, name: "Code Reviewer", created: "1 week ago", chats: 89, status: "Active" },
];

export default function DashboardPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 8 }}>My Dashboard</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Manage your created AI clones and view their performance.</p>
            </div>
            <Link to="/create">
              <button className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} />
                Create New Clone
              </button>
            </Link>
          </div>

          {/* Stats Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 48 }}>
            <div className="glass-card" style={{ padding: 24, borderRadius: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, color: 'var(--color-text-muted)' }}>
                <Settings size={20} />
                <span style={{ fontWeight: 600 }}>Total Clones</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{MY_CLONES.length}</div>
            </div>
            <div className="glass-card" style={{ padding: 24, borderRadius: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, color: 'var(--color-text-muted)' }}>
                <MessageSquare size={20} />
                <span style={{ fontWeight: 600 }}>Total Conversations</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)' }}>231</div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 24 }}>Your Creations</h2>

          {MY_CLONES.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {MY_CLONES.map(clone => (
                <div key={clone.id} className="glass-card" style={{ padding: 24, borderRadius: 24, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                      🤖
                    </div>
                    <div style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700 }}>
                      {clone.status}
                    </div>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>{clone.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 24 }}>Created {clone.created}</p>

                  <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid var(--color-border)', marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button className="btn" style={{ flex: 1, padding: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 600 }}>
                      <Edit3 size={16} /> Edit
                    </button>
                    <button className="btn" style={{ flex: 1, padding: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 600 }}>
                      <Share2 size={16} /> Share
                    </button>
                    <button className="btn" style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: 8, color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: 64, borderRadius: 24, textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: 24 }}>
                <Plus size={32} color="var(--color-text-muted)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>No clones yet</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, maxWidth: 400, margin: '0 auto' }}>You haven't created any AI clones yet. Start building your first personalized AI clone now.</p>
              <Link to="/create">
                <button className="btn btn-primary" style={{ padding: '12px 32px' }}>Create Your First Clone</button>
              </Link>
            </div>
          )}
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
