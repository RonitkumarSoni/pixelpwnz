import { BrainCircuit, MessageSquare, Box, BarChart3, DownloadCloud, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FeaturesPreviewSection() {
  const features = [
    { icon: <BrainCircuit size={28} />, title: "AI Clone", desc: "A vector database representation of your tone, emoji usage, and phrase length." },
    { icon: <MessageSquare size={28} />, title: "Simulation", desc: "Chat with yourself or simulate conversations to see how you'd react to new inputs." },
    { icon: <Box size={28} />, title: "Sandbox Environment", desc: "Experiment with creativity settings (temperature) to make your clone more precise or more wild." },
    { icon: <BarChart3 size={28} />, title: "Deep Analytics", desc: "View detailed insights into your conversation patterns directly from the memory dashboard." },
    { icon: <DownloadCloud size={28} />, title: "Export Options", desc: "Save simulated chats to share with friends or analyze offline." },
    { icon: <Terminal size={28} />, title: "Developer API", desc: "Integrate your digital twin into any platform or messaging app using our robust REST API." }
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

  const maxIndex = Math.max(0, features.length - cardsToShow);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex, isHovered]);

  return (
    <section id="features-preview" style={{ maxWidth: 1180, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Everything you need to <span className="gradient-text">Clone</span></h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto' }}>A powerful suite of tools designed to analyze, replicate, and simulate your messaging style.</p>
      </div>

      <div 
        style={{ position: 'relative', marginBottom: 40 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ overflow: 'hidden', paddingBottom: 40, paddingTop: 20 }}>
          <div 
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'stretch',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(calc(-${activeIndex * (100 / cardsToShow)}% - ${activeIndex * (24 / cardsToShow)}px))`
            }}
          >
            {features.map((f, idx) => {
              const isVisible = idx >= activeIndex && idx < activeIndex + cardsToShow;
              return (
                <div key={idx} className="glass-card" style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 32,
                  flex: `0 0 calc(${100 / cardsToShow}% - ${24 * (cardsToShow - 1) / cardsToShow}px)`,
                  border: isVisible ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
                  boxShadow: isVisible ? '0 10px 30px rgba(108,92,231,0.15)' : 'none',
                  transition: 'all 0.5s ease',
                  opacity: isVisible ? 1 : 0.6,
                  transform: isVisible ? 'scale(1)' : 'scale(0.95)'
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>{f.desc}</p>
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
    </section>
  );
}
