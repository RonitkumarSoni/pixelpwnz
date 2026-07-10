import React from 'react';
import { Bookmark, Star, MoreVertical, MessageSquare } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

export default function BookmarksPage() {
  return (
    <DashboardLayout activeTab="Bookmarks">
      <BookmarksContent />
    </DashboardLayout>
  );
}

function BookmarksContent({ c, isDark }) {
  if (!c) return null;

  const bookmarkedItems = [
    { name: 'Sarcastic Assistant', type: 'Persona', uses: 124, rating: 4.9, bg: isDark ? 'rgba(108,92,231,0.1)' : '#f3efff', iconColor: '#6c5ce7' },
    { name: 'Business Coach', type: 'Persona', uses: 89, rating: 4.7, bg: isDark ? 'rgba(46, 213, 115, 0.1)' : '#e0faea', iconColor: '#2ed573' },
    { name: 'Creative Writer', type: 'Persona', uses: 256, rating: 4.8, bg: isDark ? 'rgba(56, 189, 248, 0.1)' : '#e0f2fe', iconColor: '#38bdf8' },
    { name: 'Coding Mentor', type: 'Persona', uses: 412, rating: 5.0, bg: isDark ? 'rgba(245, 158, 11, 0.1)' : '#fef3c7', iconColor: '#f59e0b' },
    { name: 'Fitness Trainer', type: 'Persona', uses: 67, rating: 4.5, bg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2', iconColor: '#ef4444' },
    { name: 'Language Tutor', type: 'Persona', uses: 198, rating: 4.6, bg: isDark ? 'rgba(168, 85, 247, 0.1)' : '#f3e8ff', iconColor: '#a855f7' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ 
        background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
        padding: '24px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: c.textMain }}>Saved Personas & Chats</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#6c5ce7', fontWeight: 600, cursor: 'pointer', background: isDark ? 'rgba(108,92,231,0.1)' : '#f3efff', padding: '6px 16px', borderRadius: '20px' }}>Personas</span>
            <span style={{ fontSize: '13px', color: c.textMuted, fontWeight: 600, cursor: 'pointer', padding: '6px 16px', borderRadius: '20px' }}>Chats</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {bookmarkedItems.map((item, i) => (
            <div key={i} style={{ 
              background: c.cardBgSolid, borderRadius: '20px', padding: '20px', 
              boxShadow: `4px 4px 10px ${c.shadowSmall}`, border: `1px solid ${c.borderSubtle}`,
              display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative',
              transition: 'transform 0.2s', cursor: 'pointer'
            }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}>
                <Bookmark size={18} color="#6c5ce7" fill="#6c5ce7" />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={24} color={item.iconColor} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: c.textDark }}>{item.name}</h3>
                  <span style={{ fontSize: '12px', color: c.textMuted }}>{item.type}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${c.borderSubtle}`, paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: c.textDark }}>{item.rating}</span>
                </div>
                <div style={{ fontSize: '12px', color: c.textMuted }}>
                  {item.uses} Uses
                </div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.cardBgHighlight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MoreVertical size={14} color={c.textMuted} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
