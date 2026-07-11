import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "Is my chat data safe?", a: "Yes. Your chats are processed locally in your browser memory and never saved to any external database. Closing the tab wipes everything." },
    { q: "What format do I need to upload?", a: "Just a standard WhatsApp .txt export. You can get this by going to a chat, tapping 'More', and selecting 'Export Chat' (without media)." },
    { q: "Does this use OpenAI?", a: "Yes, we use the OpenAI API strictly for generating embeddings and replies, but we have opted out of all data sharing for training models. Your data is zero-retention." },
    { q: "Can I use it on mobile?", a: "Yes! Signet works on both desktop and mobile web browsers seamlessly." }
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <MessageCircleQuestion size={28} color="var(--color-primary)" />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Frequently Asked <span className="gradient-text">Questions</span></h2>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px 32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }} onClick={() => toggle(i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{faq.q}</h3>
              <ChevronDown size={20} style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: 'var(--color-text-secondary)' }} />
            </div>
            {openIndex === i && (
              <p style={{ marginTop: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
