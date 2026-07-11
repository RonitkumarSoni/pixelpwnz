import React, { useState } from 'react';
import { Search, Bell, User, Heart, Share, Download, Edit3, Share2, BadgeCheck, Camera, Sparkles, Grid } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('liked'); // 'characters' or 'liked'

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* LEFT SIDEBAR: Profile Card */}
          <div style={{ 
            flex: '1 1 300px', 
            maxWidth: 320,
            background: 'var(--color-surface)', 
            borderRadius: 24, 
            padding: 32, 
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)', 
            border: '1px solid var(--color-border)',
            position: 'sticky',
            top: 120
          }}>
            
            {/* Avatar */}
            <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 24px auto' }}>
              <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'linear-gradient(135deg, #111827, #374151)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '4px solid var(--color-surface)', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
                <User size={64} />
              </div>
              <button style={{ position: 'absolute', bottom: 4, right: 4, width: 36, height: 36, borderRadius: '50%', background: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Camera size={16} />
              </button>
            </div>

            {/* User Info */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>GorgeousBadger7462</h1>
                <BadgeCheck size={20} color="var(--color-primary)" fill="rgba(108, 92, 231, 0.1)" />
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: 8 }}>@GorgeousBadger7462</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', opacity: 0.8 }}>Joined May 12, 2025</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)' }}>0</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Followers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)' }}>0</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Following</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)' }}>0</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interactions</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px solid var(--color-primary)', color: 'var(--color-primary)', background: 'rgba(108, 92, 231, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s' }}>
                <Edit3 size={18} /> Edit Profile
              </button>
              <button style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px solid var(--color-border)', color: 'var(--color-text)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s' }}>
                <Share2 size={18} /> Share Profile
              </button>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div style={{ 
            flex: '3 1 500px', 
            background: 'var(--color-surface)', 
            borderRadius: 24, 
            padding: '32px 48px', 
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)', 
            border: '1px solid var(--color-border)' 
          }}>
            
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: 48, gap: 32 }}>
              <div 
                onClick={() => setActiveTab('characters')}
                style={{ paddingBottom: 16, borderBottom: activeTab === 'characters' ? '2px solid var(--color-primary)' : '2px solid transparent', color: activeTab === 'characters' ? 'var(--color-primary)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Grid size={18} /> My Characters
              </div>
              <div 
                onClick={() => setActiveTab('liked')}
                style={{ paddingBottom: 16, borderBottom: activeTab === 'liked' ? '2px solid var(--color-primary)' : '2px solid transparent', color: activeTab === 'liked' ? 'var(--color-primary)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Heart size={18} /> Liked Characters
              </div>
            </div>

            {/* Empty State Content */}
            {activeTab === 'liked' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '64px 0' }}>
                <div style={{ position: 'relative', marginBottom: 32 }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={40} color="var(--color-primary)" fill="rgba(108, 92, 231, 0.2)" opacity={0.8} />
                  </div>
                  <Sparkles size={24} color="var(--color-primary)" style={{ position: 'absolute', top: -10, right: -20, opacity: 0.6 }} />
                  <Sparkles size={16} color="var(--color-primary)" style={{ position: 'absolute', bottom: 10, left: -25, opacity: 0.6 }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 16 }}>No liked characters yet</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>
                  Explore the community and like your favorite characters. They will appear here for quick access.
                </p>
                <button className="btn btn-outline" style={{ marginTop: 32, padding: '12px 32px', borderRadius: 99 }}>
                  Explore Characters
                </button>
              </div>
            )}

            {activeTab === 'characters' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '64px 0' }}>
                <div style={{ position: 'relative', marginBottom: 32 }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid size={40} color="var(--color-primary)" opacity={0.8} />
                  </div>
                  <Sparkles size={24} color="var(--color-primary)" style={{ position: 'absolute', top: -10, right: -20, opacity: 0.6 }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 16 }}>No creations yet</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>
                  You haven't built any AI clones yet. Start building and they will appear here.
                </p>
                <button className="btn btn-primary" style={{ marginTop: 32, padding: '12px 32px', borderRadius: 99 }}>
                  Create First Clone
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
