import { Shield, Target, Eye, Heart, Users, Zap, CheckCircle2, MessageSquare, Lock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" style={{ maxWidth: 1180, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      
      {/* 1. Top Hero Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
        <div>
          <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>✦</span> About Signet
          </div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            Built to Preserve<br/>What <span className="gradient-text">Matters.</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 24, maxWidth: 480 }}>
            Signet is a personal AI clone platform that helps you preserve the way your loved ones talk, think, and respond. We turn your conversations into a private AI that feels uniquely them.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            <Shield size={18} color="var(--color-primary)" />
            <span>Private. Secure. 100% Yours.</span>
          </div>
        </div>

        <div style={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Main Glass Background */}
          <div className="glass-card" style={{ width: 320, height: 380, borderRadius: 32, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            {/* 3D Chat Bubble Graphic */}
            <div style={{
              width: 140, height: 120, borderRadius: 24,
              background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(108, 92, 231, 0.3), inset 0 10px 20px rgba(255,255,255,0.4)',
              transform: 'translateY(-20px)'
            }}>
              {/* Chat Bubble Tail */}
              <div style={{
                position: 'absolute', bottom: -15, left: 24,
                width: 30, height: 30,
                background: '#6C5CE7',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              }} />
              {/* Dots */}
              <div style={{ display: 'flex', gap: 8, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'white' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'white' }} />
              </div>
            </div>

            {/* Floating Lock Badge */}
            <div className="glass-card" style={{
              position: 'absolute', bottom: 60, right: -30,
              width: 80, height: 80, borderRadius: 20,
              padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <Lock size={32} color="var(--color-primary)" />
            </div>

            {/* Subtle background lines/dots could go here */}
            <div style={{ position: 'absolute', bottom: 40, left: 40, width: 60, height: 6, borderRadius: 3, background: 'var(--glass-border)' }} />
            <div style={{ position: 'absolute', bottom: 60, left: 40, width: 100, height: 6, borderRadius: 3, background: 'var(--glass-border)' }} />
          </div>
          
          {/* Sparkles */}
          <div style={{ position: 'absolute', top: 40, right: 40, color: '#A89FF5', fontSize: '1.5rem' }}>✦</div>
          <div style={{ position: 'absolute', bottom: 20, right: 80, color: '#A89FF5', fontSize: '1rem' }}>✦</div>
        </div>
      </div>

      {/* 2. Three Columns Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 100 }}>
        {/* Mission */}
        <div style={{ padding: '40px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Target size={32} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Our Mission</h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
            To create AI that truly understands how your loved ones communicate — their tone, their style, their expressions.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            So you can keep those connections alive, anytime you want.
          </p>
        </div>

        {/* Vision */}
        <div style={{ padding: '40px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Eye size={32} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Our Vision</h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
            A world where meaningful conversations are never lost.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Where everyone can talk to the people who matter — even when they're not around.
          </p>
        </div>

        {/* Values */}
        <div style={{ padding: '40px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Heart size={32} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: 24 }}>Our Values</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'Privacy Above Everything',
              'Transparency & Trust',
              'Human-Centered AI',
              'Continuous Improvement'
            ].map((value, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--color-primary)" />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Story & Features Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
        <div>
          <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>✦</span> Our Story
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            Why We Built<br/><span className="gradient-text">Signet</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: 480 }}>
            We believe conversations are more than just words. They carry emotions, memories, and personality. Signet was built to preserve that — privately and intelligently.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Feature 1 */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: 32, border: 'none', background: 'transparent' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'var(--color-text)' }}>For Real Connections</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Keep your relationships alive through the power of AI.</p>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--glass-border)', marginLeft: 88 }} />

          {/* Feature 2 */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: 32, border: 'none', background: 'transparent' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'var(--color-text)' }}>Designed for Privacy</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Your data stays with you. We never share or store your conversations.</p>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--glass-border)', marginLeft: 88 }} />

          {/* Feature 3 */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: 32, border: 'none', background: 'transparent' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'var(--color-text)' }}>Smart & Seamless</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Advanced AI + simple experience = meaningful conversations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Banner */}
      <div className="glass-card" style={{ 
        display: 'flex', alignItems: 'center', gap: 48, padding: '48px 64px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))'
      }}>
        {/* 3D S Logo */}
        <div style={{
          width: 120, height: 120, borderRadius: 32,
          background: 'linear-gradient(135deg, #A89FF5, #6C5CE7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(108, 92, 231, 0.3), inset 0 10px 20px rgba(255,255,255,0.4)',
          transform: 'rotate(-10deg)', flexShrink: 0, position: 'relative'
        }}>
          <span style={{ fontSize: '4rem', fontWeight: 900, color: 'white', fontFamily: 'sans-serif' }}>S</span>
          <div style={{ position: 'absolute', top: -10, left: -20, color: '#A89FF5', fontSize: '1rem' }}>✦</div>
          <div style={{ position: 'absolute', bottom: -10, right: -20, color: '#A89FF5', fontSize: '1.5rem' }}>✦</div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Built With Care</h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: 600 }}>
            Signet is crafted by a team of builders, designers, and AI enthusiasts who care deeply about privacy, human connection, and the future of personal AI.
          </p>
        </div>
      </div>
      
    </section>
  );
}
