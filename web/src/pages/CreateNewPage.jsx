import React from 'react';
import { UploadCloud, MessageCircle, FileText, ArrowRight, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

export default function CreateNewPage() {
  return (
    <DashboardLayout activeTab="Create">
      <CreateNewContent />
    </DashboardLayout>
  );
}

function CreateNewContent({ c, isDark }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const SOURCE_OPTIONS = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Chat',
      description: 'Export a chat from WhatsApp and upload the .txt file.',
      icon: <MessageCircle size={28} color="#25D366" />,
      link: '/upload',
      color: '#25D366',
      badge: 'Recommended'
    },
    {
      id: 'telegram',
      title: 'Telegram Chat',
      description: 'Export conversations from Telegram in JSON format.',
      icon: <MessageCircle size={28} color="#0088cc" />,
      link: '#',
      color: '#0088cc',
      badge: 'Coming Soon',
      disabled: true
    },
    {
      id: 'instagram',
      title: 'Instagram DMs',
      description: 'Download your Instagram data and upload the messages.',
      icon: <Smartphone size={28} color="#E1306C" />,
      link: '#',
      color: '#E1306C',
      badge: 'Coming Soon',
      disabled: true
    },
    {
      id: 'text',
      title: 'Plain Text / CSV',
      description: 'Upload any conversation in a structured text or CSV file.',
      icon: <FileText size={28} color="#f59e0b" />,
      link: '#',
      color: '#f59e0b',
      badge: 'Coming Soon',
      disabled: true
    }
  ];

  if (!c) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ 
        background: c.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}, inset 2px 2px 4px ${c.shadowInner}`,
        padding: '32px', border: `1px solid ${c.borderMain}`, transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: isDark ? 'rgba(108, 92, 231, 0.1)' : '#f3efff', color: '#6c5ce7', marginBottom: 24 }}>
              <UploadCloud size={32} />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: c.textMain, marginBottom: 16 }}>Create New <span style={{ color: '#6c5ce7' }}>Clone</span></h1>
            <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Choose the source of your conversation data. We will analyze the text to replicate the unique tone and personality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {SOURCE_OPTIONS.map(option => (
              <Link key={option.id} to={option.disabled ? '#' : option.link} style={{ textDecoration: 'none', pointerEvents: option.disabled ? 'none' : 'auto' }} onClick={(e) => option.disabled && e.preventDefault()}>
                <div 
                  style={{ 
                    padding: 32, 
                    borderRadius: 24, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: option.disabled ? 'default' : 'pointer',
                    opacity: option.disabled ? 0.55 : 1,
                    background: c.cardBgSolid,
                    border: `1px solid ${c.borderSubtle}`,
                    boxShadow: `4px 4px 10px ${c.shadowSmall}`
                  }}
                >
                  {option.badge && (
                    <div style={{ position: 'absolute', top: -12, right: 24, background: option.disabled ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : 'linear-gradient(135deg, #8c7ae6, #6c5ce7)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 99, boxShadow: option.disabled ? 'none' : '0 4px 12px rgba(108, 92, 231, 0.3)' }}>
                      {option.badge}
                    </div>
                  )}
                  
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(${parseInt(option.color.slice(1,3),16)}, ${parseInt(option.color.slice(3,5),16)}, ${parseInt(option.color.slice(5,7),16)}, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    {option.icon}
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: c.textDark, marginBottom: 12 }}>{option.title}</h3>
                  <p style={{ color: c.textMuted, fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 24, flexGrow: 1 }}>
                    {option.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', color: option.disabled ? c.textLight : option.color, fontWeight: 700, fontSize: '0.95rem', gap: 8, marginTop: 'auto' }}>
                    {option.disabled ? 'Coming Soon' : 'Select Source'} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 40, padding: 32, borderRadius: 24, background: c.cardBgHighlight, border: `1px solid ${c.borderSubtle}`, textAlign: 'center', boxShadow: `2px 2px 8px ${c.shadowSmall}` }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: c.textDark, marginBottom: 8 }}>Need help exporting your data?</h3>
            <p style={{ color: c.textMuted, marginBottom: 24, fontSize: '0.9rem' }}>Check out our step-by-step guides on how to safely export your chat histories without compromising privacy.</p>
            <Link to="/docs" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent', color: c.textMain, border: `1px solid ${c.borderSubtle}`,
                padding: '10px 24px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                boxShadow: `2px 2px 8px ${c.shadowSmall}`, display: 'inline-flex', alignItems: 'center'
              }}>
                Read Documentation
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
