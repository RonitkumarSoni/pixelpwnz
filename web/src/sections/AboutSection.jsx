import { Users, Code, Award, Zap, Compass, Flag } from 'lucide-react';

export default function AboutSection() {
  const team = [
    { name: 'Vineet', role: 'Backend & Parser', icon: <Code size={20} /> },
    { name: 'Daksh', role: 'Mobile App (Expo)', icon: <Zap size={20} /> },
    { name: 'Rishab', role: 'AI & Vector DB', icon: <Award size={20} /> },
    { name: 'Ronit', role: 'Web App (React)', icon: <Users size={20} /> }
  ];

  return (
    <section id="about" style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 24 }}>About <span className="gradient-text">Signet</span></h2>
        
        {/* Mission */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <Flag size={20} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Mission & Vision</h3>
        </div>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text)', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Signet is a personal writing-style clone built directly from your own chat history. It studies how you talk in real conversations to draft authentic responses for you.
        </p>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
          We built this for busy people — freelancers, founders, and agents — who receive a lot of routine messages. Sometimes you want your voice preserved and your relationships maintained, without spending the time to type out every single reply manually.
        </p>
      </div>

      {/* The Team */}
      <h3 style={{ fontSize: '1.5rem', marginBottom: 24, textAlign: 'center' }}>The Team</h3>
      <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 32, fontSize: '0.95rem' }}>
        Signet was built as a hackathon project by a dedicated 4-person team.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 60, alignItems: 'stretch' }}>
        {team.map((member) => (
          <div key={member.name} className="glass-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '32px 20px', height: '100%' }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, margin: '0 auto 16px'
            }}>
              {member.icon}
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: 4 }}>{member.name}</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{member.role}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack Expanded */}
      <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Compass size={20} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Tech Stack & Architecture</h3>
        </div>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, margin: 0, paddingLeft: 20, fontSize: '0.95rem' }}>
          <li><strong style={{ color: 'var(--color-text)' }}>Backend:</strong> Node.js and Express</li>
          <li><strong style={{ color: 'var(--color-text)' }}>Memory & Retrieval:</strong> ChromaDB (local vector database)</li>
          <li><strong style={{ color: 'var(--color-text)' }}>Web App:</strong> React (Vite) with Lucide React icons</li>
          <li><strong style={{ color: 'var(--color-text)' }}>Mobile App:</strong> React Native (Expo)</li>
        </ul>
      </div>
    </section>
  );
}
