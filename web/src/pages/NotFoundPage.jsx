import { Link } from 'react-router-dom';
import { Home, UploadCloud, Bot, BookOpen, ArrowRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const exploreLinks = [
    {
      title: 'Dashboard',
      description: 'Go back to your dashboard and continue where you left off.',
      icon: <Home size={20} color="#6C5CE7" />,
      iconBg: 'rgba(108, 92, 231, 0.1)',
      to: '/'
    },
    {
      title: 'Upload Chat',
      description: 'Upload your chats and create your AI clone.',
      icon: <UploadCloud size={20} color="#00b894" />,
      iconBg: 'rgba(0, 184, 148, 0.1)',
      to: '/upload'
    },
    {
      title: 'AI Clones',
      description: 'View and manage your existing AI clones.',
      icon: <Bot size={20} color="#fdcb6e" />,
      iconBg: 'rgba(253, 203, 110, 0.1)',
      to: '/chat'
    },
    {
      title: 'Documentation',
      description: 'Learn more about Signet and how it works.',
      icon: <BookOpen size={20} color="#0984e3" />,
      iconBg: 'rgba(9, 132, 227, 0.1)',
      to: '/docs'
    }
  ];

  return (
    <div className="page-enter" style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Navbar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px 80px',
        maxWidth: 1000,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* 404 Illustration */}
        <div style={{ position: 'relative', width: 220, height: 180, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
          
          {/* Background Offset Paper */}
          <div style={{
            position: 'absolute', top: 5, right: 35, width: 110, height: 140, 
            background: '#f1f2f6', borderRadius: 16, zIndex: 1, opacity: 0.6
          }} />

          {/* Main Paper */}
          <div style={{
            width: 120, height: 150, background: '#f8f9fa', borderRadius: '16px 16px 40px 16px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', border: '1px solid #fff', zIndex: 2
          }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0, letterSpacing: '1px' }}>404</h1>
            <div style={{ marginTop: 8, display: 'flex', gap: 16 }}>
               <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.8 }} />
               <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.8 }} />
            </div>
            {/* Sad mouth */}
            <div style={{ 
               width: 20, height: 10, borderTop: '3px solid var(--color-primary)', borderRadius: '50%', 
               marginTop: 6, opacity: 0.8
            }} />
            
            {/* Folded Corner Bottom Right */}
            <div style={{
              position: 'absolute', bottom: -1, right: -1, width: 36, height: 36,
              background: 'var(--color-primary)', borderRadius: '16px 0 16px 0',
              borderTop: '2px solid #fff', borderLeft: '2px solid #fff',
              boxShadow: '-4px -4px 10px rgba(0,0,0,0.05)'
            }} />
          </div>

          {/* Magnifying Glass */}
          <div style={{
            position: 'absolute', bottom: 10, left: 25, transform: 'rotate(-30deg)', zIndex: 3
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%', border: '7px solid var(--color-primary)',
              background: '#fff', boxShadow: 'inset 0 0 10px rgba(108, 92, 231, 0.1), 0 10px 20px rgba(108, 92, 231, 0.2)',
              boxSizing: 'border-box'
            }} />
            <div style={{
              width: 10, height: 35, background: 'var(--color-primary)', borderRadius: 5,
              position: 'absolute', top: 48, left: 22,
              boxShadow: '0 5px 15px rgba(108, 92, 231, 0.3)'
            }} />
          </div>
          
          {/* Decorative floating elements */}
          <div style={{ position: 'absolute', top: 20, left: 20, width: 30, height: 12, background: '#f3f4f6', borderRadius: 10, opacity: 0.8, transform: 'rotate(-10deg)' }} />
          <div style={{ position: 'absolute', top: 30, right: 5, width: 40, height: 16, background: '#f3f4f6', borderRadius: 10, opacity: 0.8 }} />
          <div style={{ position: 'absolute', bottom: 40, right: 15, width: 50, height: 14, background: '#f3f4f6', borderRadius: 10, opacity: 0.8 }} />
        </div>
        
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', marginBottom: 12, textAlign: 'center' }}>
          Page Not Found
        </h1>
        
        <p style={{ 
          fontSize: '0.95rem', color: '#6B7280', 
          maxWidth: 380, marginBottom: 32, lineHeight: 1.6, textAlign: 'center'
        }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="btn btn-primary" style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 8, fontSize: '0.95rem', fontWeight: 600, boxShadow: '0 10px 20px rgba(108, 92, 231, 0.2)', border: 'none', cursor: 'pointer' }}>
            <Home size={18} /> Go to Homepage
          </button>
        </Link>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 800, margin: '60px 0 40px' }}>
          <div style={{ flex: 1, height: 1, background: '#f3f4f6' }} />
          <span style={{ padding: '0 16px', fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em' }}>OR EXPLORE</span>
          <div style={{ flex: 1, height: 1, background: '#f3f4f6' }} />
        </div>

        {/* Explore Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          width: '100%',
          maxWidth: 960,
          marginBottom: 60
        }}>
          {exploreLinks.map((link, idx) => (
            <Link to={link.to} key={idx} style={{
              background: '#fff', border: '1px solid #f3f4f6', borderRadius: 16, padding: 24,
              textDecoration: 'none', display: 'flex', flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)', transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
            }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: link.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
              }}>
                {link.icon}
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>{link.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5, margin: 0, flexGrow: 1 }}>{link.description}</p>
              <div style={{ marginTop: 24, display: 'flex' }}>
                <ArrowRight size={18} color="var(--color-primary)" />
              </div>
            </Link>
          ))}
        </div>

        {/* Search Bar Container */}
        <div style={{
          width: '100%', maxWidth: 960, background: '#f9fafb', borderRadius: 16, padding: '24px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', flexShrink: 0 }}>
              <Search size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: 4 }}>Still looking for something?</h4>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>Search our documentation or help center.</p>
            </div>
          </div>

          <div style={{ position: 'relative', flexGrow: 1, maxWidth: 400, minWidth: 260 }}>
            <input 
              type="text" 
              placeholder="Search docs, features, and more..." 
              style={{
                width: '100%', padding: '14px 20px', paddingRight: 48, borderRadius: 12, border: '1px solid #e5e7eb',
                outline: 'none', fontSize: '0.9rem', color: '#111827', boxSizing: 'border-box',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
              }}
            />
            <Search size={18} color="#9CA3AF" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
