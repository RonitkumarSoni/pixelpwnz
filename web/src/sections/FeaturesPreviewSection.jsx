import { BrainCircuit, MessageSquare, Box, BarChart3, DownloadCloud } from 'lucide-react';

export default function FeaturesPreviewSection() {
  const features = [
    { icon: <BrainCircuit size={28} />, title: "AI Clone", desc: "A vector database representation of your tone, emoji usage, and phrase length." },
    { icon: <MessageSquare size={28} />, title: "Simulation", desc: "Chat with yourself or simulate conversations to see how you'd react to new inputs." },
    { icon: <Box size={28} />, title: "Sandbox Environment", desc: "Experiment with creativity settings (temperature) to make your clone more precise or more wild." },
    { icon: <BarChart3 size={28} />, title: "Deep Analytics", desc: "View detailed insights into your conversation patterns directly from the memory dashboard." },
    { icon: <DownloadCloud size={28} />, title: "Export Options", desc: "Save simulated chats to share with friends or analyze offline." }
  ];

  return (
    <section id="features-preview" style={{ maxWidth: 1180, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Everything you need to <span className="gradient-text">Clone</span></h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto' }}>A powerful suite of tools designed to analyze, replicate, and simulate your messaging style.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'stretch' }}>
        {features.map((f, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 32, transition: 'transform 0.3s ease, box-shadow 0.3s ease', height: '100%' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>{f.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
