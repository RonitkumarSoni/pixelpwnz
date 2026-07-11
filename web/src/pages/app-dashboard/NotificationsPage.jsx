import React, { useState } from 'react';
import { Bell, MessageSquare, Star, CheckCircle, Info, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

export default function NotificationsPage() {
  return (
    <DashboardLayout activeTab="Notifications">
      <NotificationsContent />
    </DashboardLayout>
  );
}

function NotificationsContent({ c, isDark }) {
  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'message', title: 'New Message from Gordon Ramsay', text: 'Where is the lamb sauce?!', time: '2 mins ago', read: false },
    { id: 2, type: 'system', title: 'System Update', text: 'Your persona processing is complete.', time: '1 hour ago', read: false },
    { id: 3, type: 'alert', title: 'Storage Warning', text: 'You have used 90% of your free storage space.', time: '2 days ago', read: true },
    { id: 4, type: 'promo', title: 'Special Offer', text: 'Upgrade to Premium for $5/month today!', time: '1 week ago', read: true }
  ]);

  if (!c) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'message': return <MessageSquare size={18} color="#6c5ce7" />;
      case 'system': return <CheckCircle size={18} color="#10B981" />;
      case 'alert': return <Info size={18} color="#F59E0B" />;
      case 'promo': return <Star size={18} color="#EC4899" />;
      default: return <Bell size={18} color={c.textMuted} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ 
        background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
        padding: '32px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: c.textMain }}>Notifications</h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: c.textMuted }}>Stay updated with your clones and account.</p>
          </div>
          <button 
            onClick={markAllRead}
            style={{ 
              background: 'transparent', border: `1px solid ${c.borderSubtle}`, color: c.textMain, 
              padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              boxShadow: `2px 2px 8px ${c.shadowSmall}`
            }}
          >
            Mark all as read
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: c.textMuted }}>No notifications. You're all caught up!</div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id} 
                style={{ 
                  display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px',
                  background: notif.read ? c.cardBgSolid : (isDark ? 'rgba(108, 92, 231, 0.1)' : 'rgba(108, 92, 231, 0.05)'), 
                  borderRadius: '16px', border: `1px solid ${notif.read ? c.borderSubtle : 'rgba(108, 92, 231, 0.3)'}`,
                  position: 'relative'
                }}
              >
                {!notif.read && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', width: '8px', height: '8px', borderRadius: '50%', background: '#6c5ce7' }} />
                )}
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                  background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `inset 2px 2px 5px ${c.shadowInner}`
                }}>
                  {getIcon(notif.type)}
                </div>
                <div style={{ flex: 1, paddingRight: '24px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: c.textDark, marginBottom: '4px' }}>{notif.title}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: c.textMuted, lineHeight: 1.5 }}>{notif.text}</p>
                  <span style={{ display: 'block', marginTop: '8px', fontSize: '11px', color: c.textLight, fontWeight: 500 }}>{notif.time}</span>
                </div>
                <button 
                  onClick={() => deleteNotification(notif.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: c.textLight }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
