import React from 'react';
import { User, Settings, CreditCard, Key, LogOut, ChevronRight, Bell, Shield, Moon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProfilePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 8 }}>Account Profile</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Manage your settings, subscription, and API keys.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
            {/* Desktop Layout Uses CSS Grid but we use Flex for simple responsive behavior */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              
              {/* Sidebar/Navigation */}
              <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="profile-tab active" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', background: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <User size={20} color="var(--color-primary)" />
                  <span style={{ fontWeight: 600, color: 'var(--color-text)', flexGrow: 1 }}>General Settings</span>
                  <ChevronRight size={16} color="var(--color-text-muted)" />
                </div>
                <div className="profile-tab" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderRadius: 12, border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <CreditCard size={20} />
                  <span style={{ fontWeight: 500, flexGrow: 1 }}>Subscription</span>
                </div>
                <div className="profile-tab" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderRadius: 12, border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <Key size={20} />
                  <span style={{ fontWeight: 500, flexGrow: 1 }}>API Keys</span>
                </div>
                <div className="profile-tab" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderRadius: 12, border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <Bell size={20} />
                  <span style={{ fontWeight: 500, flexGrow: 1 }}>Notifications</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div style={{ flex: '3 1 500px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                {/* Profile Card */}
                <div className="glass-card" style={{ padding: 32, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #A89FF5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 800 }}>
                    J
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>John Doe</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 12 }}>john@example.com</p>
                    <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>Change Avatar</button>
                  </div>
                </div>

                {/* Account Details Form */}
                <div className="glass-card" style={{ padding: 32, borderRadius: 24 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 24, color: 'var(--color-text)' }}>Personal Information</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>First Name</label>
                      <input type="text" defaultValue="John" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>Last Name</label>
                      <input type="text" defaultValue="Doe" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>Email Address</label>
                    <input type="email" defaultValue="john@example.com" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} />
                  </div>

                  <button className="btn btn-primary" style={{ padding: '12px 24px' }}>Save Changes</button>
                </div>

                {/* Danger Zone */}
                <div style={{ padding: 32, borderRadius: 24, border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, color: '#EF4444' }}>Danger Zone</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: '0.95rem' }}>Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="btn" style={{ background: '#EF4444', color: 'white', padding: '12px 24px', fontWeight: 600, borderRadius: 12, border: 'none', cursor: 'pointer' }}>Delete Account</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
