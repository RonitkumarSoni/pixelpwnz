import React, { useState, useEffect } from 'react';
import { Plus, Settings, MessageSquare, Trash2, Edit3, Share2, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSessions, clearSession } from '../api/client';
import useChatStore from '../store/chatStore';
import toast from 'react-hot-toast';
import DeleteModal from '../components/DeleteModal';

export default function DashboardPage() {
  const navigate = useNavigate();
  const setChatSession = useChatStore(state => state.setSession);
  const [clones, setClones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchClones();
  }, []);

  const fetchClones = async () => {
    try {
      setIsLoading(true);
      const data = await getSessions();
      if (data.success) {
        setClones(data.sessions);
      }
    } catch (error) {
      console.error('Failed to fetch clones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await clearSession(deleteId);
      toast.success('Clone deleted successfully');
      setClones(clones.filter(c => c.session_id !== deleteId));
    } catch (err) {
      toast.error('Failed to delete clone');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <DeleteModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
      />
      
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



          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 24 }}>Your Creations</h2>

          {isLoading ? (
            <p>Loading your clones...</p>
          ) : clones.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {clones.map(clone => (
                <div key={clone.session_id} className="glass-card" style={{ padding: 24, borderRadius: 24, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                      🤖
                    </div>
                    <div style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700 }}>
                      Active
                    </div>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>{clone.userName || 'Unknown Persona'}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 24 }}>
                    Created {new Date(clone.created_at).toLocaleDateString()}
                  </p>

                  <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid var(--color-border)', marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button 
                      className="btn" 
                      onClick={() => {
                        navigate(`/chat?session_id=${clone.session_id}`);
                      }}
                      style={{ flex: 1, padding: '8px', background: 'var(--color-primary)', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#FFF', fontSize: '0.875rem', fontWeight: 600 }}
                    >
                      <Play size={16} /> Chat
                    </button>
                    <button 
                      className="btn" 
                      onClick={() => setDeleteId(clone.session_id)}
                      style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: 8, color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      title="Delete Clone"
                    >
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
