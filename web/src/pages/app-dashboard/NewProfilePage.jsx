import React from 'react';
import { User, Mail, Shield, Key, CreditCard, LogOut, ChevronRight, CheckCircle } from 'lucide-react';
import useUiStore from '../../store/uiStore';
import DashboardLayout from '../../components/DashboardLayout';

export default function NewProfilePage() {
  return (
    <DashboardLayout activeTab="Profile">
      <ProfileContent />
    </DashboardLayout>
  );
}

function ProfileContent({ c, isDark }) {
  if (!c) return null;
  const { user } = useUiStore();
  const userName = user?.name || 'Ronit Kumar';
  const userEmail = user?.email || 'ronit@example.com';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
      
      {/* LEFT COLUMN: Profile Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
          padding: '32px 24px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
        }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${c.cardBgSolid}`, boxShadow: `0 8px 16px ${c.shadowOuter}` }} />
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', background: '#6c5ce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${c.cardBgSolid}` }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2ed573' }} />
            </div>
          </div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 700, color: c.textDark }}>{userName}</h2>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: c.textMuted }}>{userEmail}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isDark ? 'rgba(108,92,231,0.1)' : '#f3efff', padding: '6px 12px', borderRadius: '20px', color: '#6c5ce7', fontSize: '12px', fontWeight: 600 }}>
            <span>👑</span> Premium Member
          </div>
        </div>

        {/* Subscription Info */}
        <div style={{ 
          background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
          padding: '24px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: c.textDark }}>Plan Details</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: c.textMuted }}>Current Plan</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: c.textDark }}>Premium Yearly</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: c.textMuted }}>Renewal Date</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: c.textDark }}>Dec 12, 2026</span>
          </div>
          <button style={{
            width: '100%', padding: '12px', borderRadius: '16px', border: `1px solid ${c.borderSubtle}`,
            background: c.cardBgHighlight, color: c.textMain, fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: `2px 2px 8px ${c.shadowSmall}`
          }}>
            Manage Subscription
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
          padding: '32px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease'
        }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 600, color: c.textDark }}>Account Settings</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: User, title: 'Personal Information', desc: 'Update your name, photo, and bio', color: '#6c5ce7', bg: isDark ? 'rgba(108,92,231,0.1)' : '#f3efff' },
              { icon: Shield, title: 'Security & Privacy', desc: 'Password, 2FA, and sessions', color: '#2ed573', bg: isDark ? 'rgba(46, 213, 115, 0.1)' : '#e0faea' },
              { icon: CreditCard, title: 'Billing & Payments', desc: 'Payment methods and invoices', color: '#38bdf8', bg: isDark ? 'rgba(56, 189, 248, 0.1)' : '#e0f2fe' },
            ].map((setting, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                padding: '16px', borderRadius: '16px', background: c.cardBgSolid, 
                boxShadow: `2px 2px 8px ${c.shadowSmall}`, border: `1px solid ${c.borderSubtle}`,
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: setting.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <setting.icon size={22} color={setting.color} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: c.textDark }}>{setting.title}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: c.textMuted }}>{setting.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} color={c.textLight} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', borderTop: `1px solid ${c.borderSubtle}`, paddingTop: '24px' }}>
            <button style={{
              padding: '12px 24px', borderRadius: '16px', border: 'none',
              background: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2', color: '#ef4444', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
