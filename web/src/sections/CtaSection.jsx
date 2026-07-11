import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CtaSection() {
  const ctas = [
    {
      titleTop: 'Ready to build your',
      titleBottom: 'AI clone?',
      desc: 'Join thousands of people preserving conversations that matter.'
    },
    {
      titleTop: 'Ready to talk to your',
      titleBottom: 'Digital Twin?',
      desc: 'Join thousands of people preserving memories that matter.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= ctas.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [ctas.length, isHovered]);

  return (
    <section id="cta" style={{ maxWidth: 1180, margin: '0 auto', padding: '100px 24px 0 24px', position: 'relative', zIndex: 5 }}>
      
      {/* Container for Carousel */}
      <div 
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ overflow: 'hidden', paddingBottom: 80, marginBottom: -60 }}>
          <div 
            style={{
              display: 'flex',
              gap: 40,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 40}px))`
            }}
          >
            {ctas.map((cta, idx) => (
              <div key={idx} style={{ 
                flex: '0 0 100%',
                padding: '0',
                display: 'flex'
              }}>
                <div style={{ 
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '48px 64px', 
                  background: 'white',
                  borderRadius: 32,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.05)',
                  flexWrap: 'wrap',
                  gap: 40,
                  border: '1px solid var(--glass-border)'
                }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 48, flex: 1, minWidth: 300 }}>
                    {/* Chat Bubble Graphic */}
                    <div style={{ 
                      width: 140, height: 140, borderRadius: 24, 
                      background: 'rgba(108, 92, 231, 0.05)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: 80, height: 60, borderRadius: 16,
                        background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)',
                        position: 'relative',
                        boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3), inset 0 5px 10px rgba(255,255,255,0.4)',
                        transform: 'translateY(-5px)'
                      }}>
                        <div style={{
                          position: 'absolute', bottom: -10, left: 16,
                          width: 20, height: 20,
                          background: '#6C5CE7',
                          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                        }} />
                        <div style={{ display: 'flex', gap: 6, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 style={{ fontSize: '2.5rem', marginBottom: 12, fontWeight: 800, color: '#111' }}>
                        {cta.titleTop}<br/>
                        <span style={{ color: 'var(--color-primary)' }}>{cta.titleBottom}</span>
                      </h2>
                      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: 350 }}>
                        {cta.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                      <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12 }}>
                        Create Your AI Clone <ArrowRight size={18} />
                      </button>
                    </Link>
                    <a href="#how-it-works" style={{ textDecoration: 'none' }}>
                      <button className="btn" style={{ 
                        padding: '16px 32px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 12, 
                        borderRadius: 12, background: 'white', color: '#111', border: '1px solid var(--glass-border)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                      }}>
                        <Play size={18} fill="var(--color-primary)" color="var(--color-primary)" /> 
                        See How It Works
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
          {ctas.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: activeIndex === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: activeIndex === idx ? 'var(--color-primary)' : 'var(--glass-border)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
