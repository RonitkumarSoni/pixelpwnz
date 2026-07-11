import React, { useState, useEffect } from 'react';
import { Bookmark, Star, MoreVertical, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import PremiumLoader from '../../components/PremiumLoader';
import { getBookmarkedPersonas, toggleBookmark } from '../../api/client';
import toast from 'react-hot-toast';

export default function BookmarksPage() {
  return (
    <DashboardLayout activeTab="Bookmarks">
      <BookmarksContent />
    </DashboardLayout>
  );
}

function BookmarksContent({ c, isDark }) {
  const navigate = useNavigate();
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const data = await getBookmarkedPersonas();
        if (data.success) {
          // Add styling metadata to the fetched personas
          const colors = [
            { bg: isDark ? 'rgba(108,92,231,0.1)' : '#f3efff', iconColor: '#6c5ce7' },
            { bg: isDark ? 'rgba(46, 213, 115, 0.1)' : '#e0faea', iconColor: '#2ed573' },
            { bg: isDark ? 'rgba(56, 189, 248, 0.1)' : '#e0f2fe', iconColor: '#38bdf8' },
            { bg: isDark ? 'rgba(245, 158, 11, 0.1)' : '#fef3c7', iconColor: '#f59e0b' },
          ];
          
          const enhanced = data.personas.map((p, i) => ({
            ...p,
            rating: (4.5 + Math.random() * 0.5).toFixed(1),
            uses: Math.floor(Math.random() * 500) + 50,
            bg: colors[i % colors.length].bg,
            iconColor: colors[i % colors.length].iconColor
          }));
          setBookmarkedItems(enhanced);
        }
      } catch (err) {
        console.error('Failed to load bookmarks', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadBookmarks();
  }, [isDark]);

  const handleRemoveBookmark = async (e, id) => {
    e.stopPropagation();
    try {
      await toggleBookmark(id);
      setBookmarkedItems(prev => prev.filter(p => p.id !== id));
      toast.success('Removed from bookmarks');
    } catch (err) {
      toast.error('Failed to remove bookmark');
    }
  };

  if (!c) return null;

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
          {isLoading ? (
            <div style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center', gridColumn: '1 / -1' }}>
              <PremiumLoader text="Loading bookmarks..." color="#6c5ce7" size={32} />
            </div>
          ) : bookmarkedItems.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: c.textMuted, gridColumn: '1 / -1' }}>No bookmarked personas yet.</div>
          ) : (
            bookmarkedItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/explore?persona=${item.id}`)}
                style={{ 
                  background: c.cardBgSolid, borderRadius: '20px', padding: '20px', 
                  boxShadow: `4px 4px 10px ${c.shadowSmall}`, border: `1px solid ${c.borderSubtle}`,
                  display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative',
                  transition: 'transform 0.2s', cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div 
                  style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer', padding: '4px' }}
                  onClick={(e) => handleRemoveBookmark(e, item.id)}
                  title="Remove Bookmark"
                >
                  <Bookmark size={18} color="#6c5ce7" fill="#6c5ce7" />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', borderRadius: 14, objectFit: 'cover' }} 
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: c.textDark }}>{item.name}</h3>
                    <span style={{ fontSize: '12px', color: c.textMuted }}>Persona</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
