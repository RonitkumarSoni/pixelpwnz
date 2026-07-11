import React from 'react';
import { Search, Filter, MessageSquare, Bookmark, TrendingUp, Star, Award, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import DashboardLayout from '../components/DashboardLayout';
import PremiumLoader from '../components/PremiumLoader';
import apiClient from '../api/client';

import { useNavigate } from 'react-router-dom';
import useChatStore from '../store/chatStore';

export default function ExplorePage() {
  return (
    <DashboardLayout activeTab="Explore">
      <ExploreContent />
    </DashboardLayout>
  );
}

function ExploreContent({ c, isDark }) {
  const [personas, setPersonas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const navigate = useNavigate();
  const { sessionId: activeSessionId, userName: activeUserName } = useChatStore();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch custom personas
    apiClient.get('/persona')
      .then(res => {
        if (res.data.success) {
          setPersonas(res.data.personas);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch personas:', err);
        setIsLoading(false);
      });
  }, []);

  const toggleBookmark = async (id, index) => {
    try {
      const res = await apiClient.post(`/persona/${id}/bookmark`);
      if (res.data.success) {
        setPersonas(prev => {
          const newPersonas = [...prev];
          newPersonas[index] = { 
            ...newPersonas[index], 
            is_liked: res.data.is_liked, 
            likes_count: res.data.likes_count 
          };
          return newPersonas;
        });
      }
    } catch (err) {
      console.error('Failed to bookmark:', err);
    }
  };

  if (!c) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ 
        background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
        padding: '32px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          {/* Header & Search */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: c.textMain, marginBottom: 16 }}>Explore <span style={{ color: '#6c5ce7' }}>AI Clones</span></h1>
            <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 600, margin: '0 auto', marginBottom: 40, lineHeight: 1.6 }}>
              Discover the most popular, creative, and hilarious AI clones created by the Signet community.
            </p>

            <div style={{ display: 'flex', gap: 16, maxWidth: 640, margin: '0 auto' }}>
              <div style={{ flexGrow: 1, position: 'relative' }}>
                <Search size={18} color={c.textLight} style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search for a clone, creator, or topic..." 
                  style={{ 
                    width: '100%', padding: '14px 16px 14px 44px', borderRadius: 99, 
                    border: `1px solid ${c.borderSubtle}`, background: c.inputBg, color: c.textMain, 
                    fontSize: '0.95rem', outline: 'none', boxShadow: `inset 2px 2px 5px ${c.shadowSmall}` 
                  }} 
                />
              </div>
              <button style={{ 
                padding: '0 24px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 8,
                background: c.cardBgHighlight, color: c.textMain, border: `1px solid ${c.borderSubtle}`,
                fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', boxShadow: `2px 2px 8px ${c.shadowSmall}`
              }}>
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 40, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {['All', 'Trending', 'Historical', 'Entertainment', 'Tech', 'Educational', 'Funny'].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <div 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ 
                    padding: '8px 20px', 
                    borderRadius: 99, 
                    background: isActive ? '#6c5ce7' : c.cardBgHighlight, 
                    color: isActive ? '#fff' : c.textMain,
                    border: isActive ? 'none' : `1px solid ${c.borderSubtle}`,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 12px rgba(108, 92, 231, 0.3)' : 'none'
                  }}>
                  {cat}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {isLoading ? (
              <div style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center', gridColumn: '1 / -1' }}>
                <PremiumLoader text="Discovering clones..." color="#6c5ce7" size={32} />
              </div>
            ) : personas.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map(clone => (
              <div key={clone.id} style={{ 
                padding: 24, borderRadius: 24, display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer',
                background: c.cardBgSolid, border: `1px solid ${c.borderSubtle}`, boxShadow: `4px 4px 10px ${c.shadowSmall}`
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => {
                // Resume active session if it matches the persona
                if (activeUserName === clone.name && activeSessionId) {
                  navigate(`/chat?session_id=${activeSessionId}`);
                  return;
                }
                
                const toastId = toast.loading('Loading persona...');
                apiClient.post(`/persona/${clone.id}`)
                  .then(res => {
                    toast.dismiss(toastId);
                    if (res.data.success && res.data.session_id) {
                      navigate(`/chat?session_id=${res.data.session_id}`);
                    }
                  })
                  .catch(err => {
                    toast.dismiss(toastId);
                    toast.error('Failed to load persona.');
                    console.error(err);
                  });
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: isDark ? 'rgba(108, 92, 231, 0.1)' : '#f3efff', color: '#6c5ce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={clone.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(clone.name)}&background=random`} 
                      alt={clone.name} 
                      style={{ width: '100%', height: '100%', borderRadius: 16, objectFit: 'cover' }} 
                    />
                  </div>
                  <button 
                    style={{ 
                      padding: '6px 16px', fontSize: '0.85rem', borderRadius: 99,
                      background: 'linear-gradient(135deg, #8c7ae6, #6c5ce7)', color: '#fff', border: 'none',
                      fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(108,92,231,0.2)'
                    }}
                  >
                    Chat
                  </button>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: c.textDark, marginBottom: 4 }}>{clone.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#6c5ce7', fontWeight: 600, marginBottom: 12 }}>@{clone.id}</p>
                <p style={{ color: c.textMuted, fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 24, flexGrow: 1 }}>
                  {clone.description || 'Ready to chat!'}
                </p>

                <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: `1px solid ${c.borderSubtle}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.textMuted, fontSize: '0.85rem', fontWeight: 600 }}>
                    <MessageSquare size={16} />
                    {(clone.chat_count || 0).toLocaleString()}
                  </div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(clone.id, personas.findIndex(p => p.id === clone.id));
                    }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 6, 
                      color: clone.is_liked ? '#6c5ce7' : c.textMuted, 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                  >
                    <Bookmark size={16} fill={clone.is_liked ? '#6c5ce7' : 'none'} />
                    {(clone.likes_count || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button style={{ 
              padding: '10px 24px', borderRadius: 99, background: 'transparent', 
              color: c.textMain, border: `1px solid ${c.borderSubtle}`, fontWeight: 600,
              cursor: 'pointer', fontSize: '0.9rem'
            }}>
              Load More
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
