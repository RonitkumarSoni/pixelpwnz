import React from 'react';
import { UploadCloud, MessageCircle, FileText, ArrowRight, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CreateNewPage() {
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
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', marginBottom: 24 }}>
              <UploadCloud size={32} />
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 16 }}>Create New <span className="text-gradient">Clone</span></h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: 600, margin: '0 auto' }}>
              Choose the source of your conversation data. We will analyze the text to replicate the unique tone and personality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {SOURCE_OPTIONS.map(option => (
              <Link key={option.id} to={option.link} style={{ textDecoration: 'none' }}>
                <div 
                  className="glass-card option-card" 
                  style={{ 
                    padding: 32, 
                    borderRadius: 24, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: '2px solid transparent'
                  }}
                >
                  {option.badge && (
                    <div style={{ position: 'absolute', top: -12, right: 24, background: 'linear-gradient(135deg, var(--color-primary), #A89FF5)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 99, boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)' }}>
                      {option.badge}
                    </div>
                  )}
                  
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(${parseInt(option.color.slice(1,3),16)}, ${parseInt(option.color.slice(3,5),16)}, ${parseInt(option.color.slice(5,7),16)}, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    {option.icon}
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>{option.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 24, flexGrow: 1 }}>
                    {option.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', color: option.color, fontWeight: 700, fontSize: '0.95rem', gap: 8, marginTop: 'auto' }}>
                    Select Source <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 64, padding: 32, borderRadius: 24, background: 'var(--color-surface)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>Need help exporting your data?</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>Check out our step-by-step guides on how to safely export your chat histories without compromising privacy.</p>
            <Link to="/docs">
              <button className="btn btn-outline" style={{ padding: '10px 24px' }}>Read Documentation</button>
            </Link>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
