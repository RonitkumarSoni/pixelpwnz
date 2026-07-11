import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bell, Sun, Moon, ChevronRight, AlignLeft, X, MoreVertical, Star, Home, Compass, PlusCircle, Bookmark, User, Settings, LogOut
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import useUiStore from '../store/uiStore';

export default function DashboardLayout({ children, activeTab = 'Home' }) {
  const { user, theme, toggleTheme } = useUiStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { logout, user: authUser } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Use authStore user (JWT-verified) as primary, fallback to uiStore user
  const activeUser = authUser || user;
  const userName = activeUser?.name || 'User';
  const userAvatar = activeUser?.avatar || activeUser?.photoURL || activeUser?.picture || null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const isDark = theme === 'dark';
  const c = {
    bg: isDark ? '#13111C' : 'transparent',
    bgGradient: isDark ? 'radial-gradient(rgba(108, 92, 231, 0.15) 2px, transparent 2px)' : 'radial-gradient(rgba(108, 92, 231, 0.3) 2px, transparent 2px)',
    textMain: isDark ? '#FFFFFF' : '#3d3951',
    textDark: isDark ? '#F8F7FC' : '#2d2a40',
    textMuted: isDark ? '#A09DB0' : '#7b7694',
    textLight: isDark ? '#8A869D' : '#9a94b5',
    cardBg: isDark ? 'rgba(30, 28, 46, 0.7)' : 'rgba(255, 255, 255, 0.3)',
    cardBgSolid: isDark ? '#1E1C2E' : '#ffffff',
    cardBgHighlight: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
    borderMain: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.45)',
    borderSubtle: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(199, 190, 230, 0.5)',
    shadowOuter: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(180, 170, 210, 0.25)',
    shadowInner: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
    shadowSmall: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(199,190,230,0.15)',
    sidebarBg: isDark ? 'rgba(19, 17, 28, 0.85)' : 'rgba(248, 247, 252, 0.8)',
    navActiveBg: isDark ? 'rgba(108, 92, 231, 0.15)' : '#ffffff',
    navActiveBorder: isDark ? 'rgba(108, 92, 231, 0.5)' : 'rgba(255,255,255,0.8)',
    iconBg: isDark ? '#2A273F' : '#ffffff',
    iconShadowOuter: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(199,190,230,0.4)',
    iconShadowInner: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
    inputBg: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
  };

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      backgroundColor: c.bg,
      backgroundImage: c.bgGradient,
      backgroundSize: '24px 24px',
      backgroundPosition: '0 0',
      display: 'flex',
      fontFamily: '"Inter", system-ui, sans-serif',
      color: c.textMain,
      overflow: 'hidden',
      transition: 'background-color 0.3s ease'
    },
    sidebar: {
      width: '260px',
      height: '100vh',
      padding: '32px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: isSidebarOpen ? 0 : '-260px',
      top: 0,
      borderRight: `1px solid ${c.borderMain}`,
      boxShadow: `4px 0 20px ${c.shadowOuter}`,
      background: c.sidebarBg,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 100,
      transition: 'all 0.3s ease'
    },
    main: {
      marginLeft: isSidebarOpen ? '260px' : '0',
      flex: 1,
      padding: '20px 32px',
      maxWidth: isSidebarOpen ? 'calc(100vw - 260px)' : '100vw',
      boxSizing: 'border-box',
      background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      height: '100vh',
      overflowY: 'auto',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    },
    navItem: (active = false) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      borderRadius: '16px',
      marginBottom: '8px',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '14px',
      color: active ? '#7c6cf6' : c.textMuted,
      background: active ? c.navActiveBg : 'transparent',
      boxShadow: active ? '0 4px 12px rgba(108, 92, 231, 0.08)' : 'none',
      border: active ? `1px solid ${c.navActiveBorder}` : '1px solid transparent',
      transition: 'all 0.2s ease'
    }),
    iconWrapper: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: c.iconBg,
      boxShadow: `3px 3px 8px ${c.iconShadowOuter}, -3px -3px 8px ${c.iconShadowInner}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', padding: '0 10px' }}>
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div className="nav-logo-icon" style={{ 
              width: '44px', height: '44px', 
              borderRadius: '14px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img src="/logo.png" alt="Signet Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: c.textDark, lineHeight: 1, transition: 'color 0.3s' }}>Signet</span>
              <span style={{ fontSize: '12px', color: c.textLight, fontWeight: 600, lineHeight: 1 }}>AI Clone</span>
            </div>
          </div>
          <X 
            size={20} 
            color={c.textLight} 
            style={{ cursor: 'pointer', display: isSidebarOpen ? 'block' : 'none' }} 
            onClick={() => setIsSidebarOpen(false)} 
          />
        </div>

        {/* Navigation */}
        <div style={{ flex: 1 }}>
          <div style={styles.navItem(activeTab === 'Home')} onClick={() => navigate('/dashboard')}>
            <Home size={18} /> Home
          </div>
          <div style={styles.navItem(activeTab === 'Explore')} onClick={() => navigate('/explore')}>
            <Compass size={18} /> Explore
          </div>
          <div style={styles.navItem(activeTab === 'Create')} onClick={() => navigate('/create')}>
            <PlusCircle size={18} /> Create
          </div>
          <div style={styles.navItem(activeTab === 'Bookmarks')} onClick={() => navigate('/bookmarks')}>
            <Bookmark size={18} /> Bookmarks
          </div>
          <div style={styles.navItem(activeTab === 'Profile')} onClick={() => navigate('/profile')}>
            <User size={18} /> Profile
          </div>
        </div>

        {/* Profile / Upgrade */}
        <div style={{ background: c.cardBgHighlight, borderRadius: '20px', padding: '12px', marginTop: 'auto', transition: 'background 0.3s' }}>
          {/* Top: Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            <img src={userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6c5ce7&color=fff`} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: c.textDark, lineHeight: 1.2, transition: 'color 0.3s' }}>{userName}</h4>
              <p style={{ margin: 0, fontSize: '11px', color: c.textMuted, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                <span style={{ fontSize: '12px' }}>👑</span> Premium Plan
              </p>
            </div>
            <div style={{ position: 'relative' }} ref={profileMenuRef}>
              <div 
                style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                onClick={(e) => { e.stopPropagation(); setIsProfileMenuOpen(!isProfileMenuOpen); }}
              >
                <MoreVertical size={14} color="#6c5ce7" />
              </div>
              
              {isProfileMenuOpen && (
                <div style={{
                  position: 'absolute', bottom: 'calc(100% + 10px)', right: 0, width: '180px',
                  background: c.cardBgSolid, borderRadius: '16px', padding: '8px',
                  boxShadow: `0 8px 24px ${c.shadowOuter}`, border: `1px solid ${c.borderSubtle}`,
                  display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 100
                }}>
                  <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', color: c.textDark, fontSize: '13px', fontWeight: 500, transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = c.cardBgHighlight}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => { setIsProfileMenuOpen(false); navigate('/profile'); }}
                  >
                    <Settings size={16} color={c.textLight} /> Account Settings
                  </div>
                  <div style={{ height: '1px', background: c.borderSubtle, margin: '4px 0' }} />
                  <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', color: '#ef4444', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => { setIsProfileMenuOpen(false); logout(); navigate('/login'); }}
                  >
                    <LogOut size={16} /> Logout
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Middle: Storage */}
          <div style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', borderRadius: '16px', padding: '12px', marginBottom: '12px', boxShadow: `inset 2px 2px 5px ${c.shadowInner}` }}>
            <div style={{ fontSize: '11px', color: c.textMuted, marginBottom: '8px', fontWeight: 500 }}>Storage Used</div>
            <div style={{ width: '100%', height: '4px', background: c.primaryLight, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, #8c7ae6, #6c5ce7)', borderRadius: '2px' }} />
            </div>
            <div style={{ textAlign: 'right', fontSize: '10px', color: c.textMuted, marginTop: '6px', fontWeight: 600 }}>24 MB / 1 GB</div>
          </div>

          {/* Bottom: Upgrade Button */}
          <button 
            className="upgrade-btn-blob"
            onClick={() => navigate('/profile', { state: { activeSetting: 'billing' } })}
          >
            <div className="blob1"></div>
            <div className="blob2"></div>
            <div className="inner">
              <Star size={16} /> Upgrade Plan
            </div>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!isSidebarOpen && (
              <div 
                style={{ ...styles.iconWrapper, cursor: 'pointer' }}
                onClick={() => setIsSidebarOpen(true)}
              >
                <AlignLeft size={22} color={c.textMuted} />
              </div>
            )}
            <div>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 600, color: c.textMain, transition: 'color 0.3s' }}>
                {activeTab === 'Home' && `${getGreeting()}, ${userName} 👋`}
                {activeTab === 'Explore' && 'Explore Personas'}
                {activeTab === 'Create' && 'Create New Persona'}
                {activeTab === 'Bookmarks' && 'Your Bookmarks'}
                {activeTab === 'Profile' && 'Your Profile'}
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: c.textMuted }}>
                {activeTab === 'Home' && 'Your AI Clone is ready to chat with you'}
                {activeTab === 'Explore' && 'Discover unique AI personalities'}
                {activeTab === 'Create' && 'Build a new AI from your data'}
                {activeTab === 'Bookmarks' && 'Quick access to your favorites'}
                {activeTab === 'Profile' && 'Manage your account and settings'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="search-neumorphic">
              <div className="btn-inner">
                <input className="dashboard-search-input" type="text" placeholder="Search anything..." style={{ color: c.textMain }} />
                <Search size={16} color={c.textLight} style={{ zIndex: 2, position: 'relative' }} />
              </div>
            </div>
            
            <button 
              className="icon-btn-neumorphic"
              onClick={(e) => {
                e.currentTarget.classList.toggle('active');
                setTimeout(() => navigate('/notifications'), 150);
              }}
            >
              <span className="btn-inner">
                <Bell size={20} color={c.textMuted} style={{ zIndex: 2, position: 'relative' }} />
                <div style={{ position: 'absolute', top: '10px', right: '12px', width: '6px', height: '6px', background: '#6c5ce7', borderRadius: '50%', zIndex: 3 }} />
              </span>
            </button>
            
            <button 
              className="icon-btn-neumorphic"
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.classList.add('active');
                setTimeout(() => {
                  toggleTheme();
                  btn.classList.remove('active');
                }, 150);
              }}
            >
              <span className="btn-inner">
                {isDark ? (
                  <Moon size={20} color="#c7bee6" fill="#c7bee6" style={{ zIndex: 2, position: 'relative' }} />
                ) : (
                  <Sun size={20} color="#fbc531" fill="#fbc531" style={{ zIndex: 2, position: 'relative' }} />
                )}
              </span>
            </button>

            <img src={userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6c5ce7&color=fff`} alt="User" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${c.borderMain}`, cursor: 'pointer' }} onClick={() => navigate('/profile')} />
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: 'auto 0', width: '100%' }}>
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { c, isDark });
              }
              return child;
            })}
          </div>
        </div>

      </div>
      <style>{`
        .dashboard-search-input::placeholder {
          color: ${c.textMuted};
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
