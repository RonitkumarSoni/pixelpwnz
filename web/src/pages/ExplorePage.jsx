import React from 'react';
import { Search, Filter, MessageSquare, Heart, TrendingUp, Star, Award, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../api/client';

const CLONES = [
  { id: 1, name: "Albert Einstein", creator: "@historybuff", description: "Discuss physics and philosophy with the genius himself.", chats: "12.4k", likes: "4.2k", icon: <Star size={24} /> },
  { id: 2, name: "Tech Bro Chad", creator: "@silicon_valley", description: "Always talking about crypto, AI, and grinding 24/7.", chats: "8.1k", likes: "3.5k", icon: <Zap size={24} /> },
  { id: 3, name: "Gordon Ramsay", creator: "@chef_master", description: "He will brutally critique your coding skills like food.", chats: "24.5k", likes: "9.8k", icon: <Award size={24} /> },
  { id: 4, name: "Socrates", creator: "@philosopher", description: "Answers every question with another question.", chats: "5.2k", likes: "1.2k", icon: <Star size={24} /> },
  { id: 5, name: "Startup Founder", creator: "@hustle_culture", description: "Pitch him your ideas, he will probably steal them.", chats: "15.3k", likes: "6.7k", icon: <TrendingUp size={24} /> },
  { id: 6, name: "Grumpy Cat", creator: "@meme_lord", description: "Responds to everything with extreme apathy.", chats: "45.1k", likes: "18.2k", icon: <Heart size={24} /> },
];

export default function ExplorePage() {
  const [personas, setPersonas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState('All');

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          {/* Header & Search */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 16 }}>Explore <span className="text-gradient">AI Clones</span></h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: 600, margin: '0 auto', marginBottom: 40 }}>
              Discover the most popular, creative, and hilarious AI clones created by the Signet community.
            </p>

            <div style={{ display: 'flex', gap: 16, maxWidth: 640, margin: '0 auto' }}>
              <div style={{ flexGrow: 1, position: 'relative' }}>
                <Search size={20} color="var(--color-text-muted)" style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search for a clone, creator, or topic..." 
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: 99, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} 
                />
              </div>
              <button className="btn btn-outline" style={{ padding: '0 24px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 40, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {['All', 'Trending', 'Historical', 'Entertainment', 'Tech', 'Educational', 'Funny'].map((cat, i) => {
              const isActive = selectedCategory === cat;
              return (
                <div 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ 
                    padding: '8px 20px', 
                    borderRadius: 99, 
                    background: isActive ? 'var(--color-primary)' : 'var(--color-surface)', 
                    color: isActive ? 'white' : 'var(--color-text)',
                    border: isActive ? 'none' : '1px solid var(--color-border)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}>
                  {cat}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {isLoading ? (
              <p>Loading personas...</p>
            ) : personas.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map(clone => (
              <div key={clone.id} className="glass-card" style={{ padding: 24, borderRadius: 24, display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(168, 159, 245, 0.2))', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={24} />
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: 99 }}
                    onClick={() => {
                      // Call backend to initialize this session and redirect
                      apiClient.post(`/persona/${clone.id}`)
                        .then(res => {
                          if (res.data.success && res.data.session_id) {
                            window.location.href = `/chat?session_id=${res.data.session_id}`;
                          }
                        });
                    }}
                  >
                    Chat
                  </button>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>{clone.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 12 }}>@signet_official</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 24, flexGrow: 1 }}>
                  {clone.description || 'Official predefined persona. Ready to chat!'}
                </p>

                <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <MessageSquare size={16} />
                    {(clone.chat_count || 0).toLocaleString()}
                  </div>
                  <div 
                    onClick={() => toggleBookmark(clone.id, personas.findIndex(p => p.id === clone.id))}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 6, 
                      color: clone.is_liked ? '#ff4757' : 'var(--color-text-muted)', 
                      fontSize: '0.875rem', 
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                  >
                    <Heart size={16} fill={clone.is_liked ? '#ff4757' : 'none'} />
                    {(clone.likes_count || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn btn-outline" style={{ padding: '12px 32px' }}>Load More</button>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
