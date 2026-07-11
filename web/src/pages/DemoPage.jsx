import { Link } from 'react-router-dom';
import { Upload, Cpu, Sparkles, MessageSquare, Play, ArrowUpRight, Cloud, Activity, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoSection from '../sections/DemoSection';
import { useEffect } from 'react';

export default function DemoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-enter" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80, position: 'relative', background: '#F8F8FC' }}>
        {/* Ambient background */}
        <div className="ambient-orb orb-primary" style={{ opacity: 0.08 }} />
        <div className="bg-grid" style={{ opacity: 0.5 }} />
        
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          
          {/* ── Demo Overview Top Section ── */}
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ 
              display: 'inline-block', padding: '4px 12px', background: 'rgba(108, 92, 231, 0.1)', 
              color: 'var(--color-primary)', borderRadius: 99, fontSize: '0.75rem', fontWeight: 800, 
              letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16
            }}>
              Demo Overview
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 48 }}>
              From Upload to AI Clone in 4 Simple Steps
            </h1>

            {/* 4 Steps */}
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', gap: 24 }}>
              {/* Step 1 */}
              <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                    <Upload size={28} />
                  </div>
                  <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid white' }}>1</div>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Upload Chat</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Upload your exported chat file securely.</p>
              </div>

              {/* Step 2 */}
              <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                    <Cpu size={28} />
                  </div>
                  <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid white' }}>2</div>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>AI Processing</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>We analyze tone, style, patterns & personality.</p>
              </div>

              {/* Step 3 */}
              <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                    <Sparkles size={28} />
                  </div>
                  <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid white' }}>3</div>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>AI Clone Ready</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Your AI clone is created based on your data.</p>
              </div>

              {/* Step 4 */}
              <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                    <MessageSquare size={28} />
                  </div>
                  <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid white' }}>4</div>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Start Chatting</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Talk to your AI clone anytime, anywhere.</p>
              </div>
              
              {/* Connector Line (Desktop only, rough approximation) */}
              <div style={{ position: 'absolute', top: 32, left: 100, right: 100, height: 0, borderTop: '2px dashed var(--glass-border)', zIndex: 1, display: 'none' }} className="step-connector" />
            </div>
          </div>

          {/* ── Video Card Section ── */}
          <div className="glass-card" style={{ padding: 32, borderRadius: 32, display: 'flex', gap: 48, marginBottom: 40, alignItems: 'center', background: 'white', flexDirection: 'row', flexWrap: 'wrap' }}>
            
            {/* Left: Video Placeholder */}
            <div style={{ 
              flex: '1 1 400px', height: 340, background: 'linear-gradient(135deg, #9F91F5, #8B7CF7)', 
              borderRadius: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'white', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, backdropFilter: 'blur(4px)', cursor: 'pointer', transition: 'all 0.2s ease', ':hover': { background: 'rgba(0,0,0,0.3)', transform: 'scale(1.05)' } }}>
                <Play size={28} fill="currentColor" style={{ marginLeft: 4 }} />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>2 Minute Product Demo</span>
            </div>

            {/* Right: Content */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ 
                  display: 'inline-block', padding: '4px 12px', background: 'rgba(108, 92, 231, 0.1)', 
                  color: 'var(--color-primary)', borderRadius: 99, fontSize: '0.75rem', fontWeight: 800, 
                  letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16
                }}>
                  Demo Video
                </div>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 16, lineHeight: 1.2 }}>
                  <span className="gradient-text">Watch</span> Signet in Action
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  See how Signet transforms your conversations into a lifelike AI clone that remembers, understands, and replies just like them.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div className="badge" style={{ background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)', fontWeight: 600, padding: '8px 16px', borderRadius: 12 }}>
                  <Cloud size={16} color="var(--color-primary)" /> Real Upload
                </div>
                <div className="badge" style={{ background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)', fontWeight: 600, padding: '8px 16px', borderRadius: 12 }}>
                  <Activity size={16} color="var(--color-primary)" /> Live Processing
                </div>
                <div className="badge" style={{ background: 'white', border: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)', fontWeight: 600, padding: '8px 16px', borderRadius: 12 }}>
                  <MessageCircle size={16} color="var(--color-primary)" /> AI Conversation
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <button className="btn btn-primary" style={{ padding: '12px 28px', borderRadius: 12, fontSize: '0.95rem' }}>
                  <Play size={16} fill="currentColor" /> Play Demo
                </button>
                <Link to="/docs" className="btn btn-ghost" style={{ padding: '12px 28px', borderRadius: 12, fontSize: '0.95rem' }}>
                  View Docs <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Live Preview Card Section ── */}
          <div className="glass-card" style={{ padding: 32, borderRadius: 32, display: 'flex', gap: 48, alignItems: 'center', background: 'white', flexDirection: 'row', flexWrap: 'wrap' }}>
            
            {/* Left: Content */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ 
                display: 'inline-block', padding: '4px 12px', background: 'rgba(108, 92, 231, 0.1)', 
                color: 'var(--color-primary)', borderRadius: 99, fontSize: '0.75rem', fontWeight: 800, 
                letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8, alignSelf: 'flex-start'
              }}>
                Live Preview
              </div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.2 }}>
                Real Conversations.<br />
                <span className="gradient-text">Real Responses.</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: 8 }}>
                Here's how a conversation with your AI clone looks and feels.
              </p>
            </div>

            {/* Right: Interactive Demo Chat */}
            <div style={{ flex: '2 1 400px', background: 'var(--color-bg)', borderRadius: 24, border: '1px solid var(--glass-border)', overflow: 'hidden', height: 400 }}>
               <DemoSection />
            </div>

          </div>

        </div>
      </div>
      <Footer />

      <style>{`
        @media (min-width: 900px) {
          .step-connector { display: block !important; }
        }
      `}</style>
    </>
  );
}
