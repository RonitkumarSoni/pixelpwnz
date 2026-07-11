import { Upload, FileSearch, BrainCircuit, MessageSquare, BarChart2, ShieldCheck, Lock, CloudLightning, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HowItWorksSection() {
  const steps = [
    { num: '01', icon: <Upload size={28} />, title: 'Upload Your Chat', desc: 'Upload your exported chat file from any platform. We support multiple formats.', badge: '.txt, .json, .zip supported' },
    { num: '02', icon: <FileSearch size={28} />, title: 'We Process It', desc: 'Our AI extracts messages, analyzes patterns, tone, and the way they communicate.', badge: 'Secure & Private' },
    { num: '03', icon: <BrainCircuit size={28} />, title: 'AI Learns & Clones', desc: 'Advanced AI models learn their unique style, tone, vocabulary, and personality.', badge: 'Your AI Clone is Ready' },
    { num: '04', icon: <MessageSquare size={28} />, title: 'Start Chatting', desc: 'Chat with your AI clone that replies just like them. Feel the real connection.', badge: 'Realistic Responses' },
    { num: '05', icon: <BarChart2 size={28} />, title: 'Insights & Analytics', desc: 'Get deep insights into their chatting behavior, patterns, and personality.', badge: 'Smart Analytics' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Responsive cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, steps.length - cardsToShow);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex, isHovered]);

  return (
    <section id="how-it-works" style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px', position: 'relative', zIndex: 5 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="tag" style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 16 }}>✦</span> Simple. Secure. Intelligent.
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>
          How Signet <span className="gradient-text">Works</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
          From your chat history to a personalized AI clone in just a few simple steps.<br />
          Private, secure, and 100% you.
        </p>
      </div>
      
      {/* Horizontal Slider Layout */}
      <div 
        className="how-it-works-carousel" 
        style={{ position: 'relative', marginBottom: 40 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ overflow: 'hidden', paddingBottom: 40, paddingTop: 20 }}>
          <div 
            style={{
              display: 'flex',
              gap: 24,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(calc(-${activeIndex * (100 / cardsToShow)}% - ${activeIndex * (24 / cardsToShow)}px))`
            }}
          >
            {steps.map((step, idx) => {
              // Calculate if the card is completely visible
              const isVisible = idx >= activeIndex && idx < activeIndex + cardsToShow;
              return (
                <div key={step.num} className="glass-card step-card" style={{
                  display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '40px 20px 30px',
                  position: 'relative', background: 'var(--color-surface)',
                  alignItems: 'center', justifyContent: 'space-between',
                  flex: `0 0 calc(${100 / cardsToShow}% - ${24 * (cardsToShow - 1) / cardsToShow}px)`,
                  border: isVisible ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
                  boxShadow: isVisible ? '0 10px 30px rgba(108,92,231,0.15)' : 'none',
                  transition: 'all 0.5s ease',
                  opacity: isVisible ? 1 : 0.6,
                  transform: isVisible ? 'scale(1)' : 'scale(0.95)'
                }}>
                  {/* Top Number Badge */}
                  <div style={{
                    position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                    width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.4)'
                  }}>
                    {step.num}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, width: '100%' }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(139, 124, 247, 0.05))',
                      color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 24, boxShadow: 'inset 0 0 20px rgba(108, 92, 231, 0.05)'
                    }}>
                      {step.icon}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text)' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24 }}>{step.desc}</p>
                  </div>

                  {/* Bottom Badge */}
                  <div style={{
                    background: 'rgba(108, 92, 231, 0.08)', color: 'var(--color-primary)',
                    padding: '6px 14px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600, width: '100%'
                  }}>
                    {step.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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

      {/* Features Panel */}
      <div className="glass-badge" style={{
        padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 40, marginBottom: 60, alignItems: 'start'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>Privacy First</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Your data never leaves your device. We never store your conversations.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Lock size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>100% Secure</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>End-to-end encrypted processing keeps your conversations safe.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CloudLightning size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>Lightning Fast</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Get your AI clone ready in just a few minutes.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Link to="/upload">
          <button className="btn btn-primary" style={{ padding: '16px 32px' }}>
            Create Your AI Clone <ArrowRight size={18} />
          </button>
        </Link>
        <Link to="/demo" style={{ textDecoration: 'none' }}>
          <button className="btn btn-ghost" style={{ padding: '16px 32px' }}>
            <Play size={18} fill="#6C5CE7" color="#6C5CE7" /> Watch Demo
          </button>
        </Link>
      </div>
    </section>
  );
}
