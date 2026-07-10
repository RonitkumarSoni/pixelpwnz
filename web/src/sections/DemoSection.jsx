import { useState, useEffect } from 'react';
import { Bot, User, Send } from 'lucide-react';

export default function DemoSection() {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'hey are we still on for tonight?' }
  ]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (messages.length === 1) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          ...messages,
          { role: 'assistant', content: 'yeah for sure, same place as last time? ill be there around 8' }
        ]);
      }, 1500);
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (messages.length > 2) return; // limit demo
    setMessages([...messages, { role: 'user', content: 'perfect see u then!' }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'bet. drive safe' }
      ]);
    }, 1200);
  };

  return (
    <section id="demo" style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 5 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Interactive <span className="gradient-text">Demo</span></h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>See how the AI perfectly mimics lowercase texting, abbreviations, and tone.</p>
      </div>

      <div className="glass-card" style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 400, padding: 0, overflow: 'hidden' }}>
        {/* Demo Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Your AI Clone</div>
            <div style={{ fontSize: '0.8rem', color: '#10B981' }}>Online</div>
          </div>
        </div>

        {/* Demo Messages */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              {m.role === 'assistant' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.2)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={16} />
                </div>
              )}
              <div style={{
                background: m.role === 'user' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                color: m.role === 'user' ? 'white' : 'var(--color-text)',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: m.role === 'assistant' ? 4 : 16,
                border: m.role === 'assistant' ? '1px solid var(--glass-border)' : 'none',
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', gap: 12, alignSelf: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.2)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={16} />
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: 4, display: 'flex', gap: 4, alignItems: 'center' }}>
                <div className="typing-dot"></div>
                <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Input */}
        <form onSubmit={handleSend} style={{ padding: 16, borderTop: '1px solid var(--glass-border)', display: 'flex', gap: 12, background: 'rgba(255,255,255,0.02)' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            disabled={messages.length > 2}
            style={{ 
              flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', 
              borderRadius: 24, padding: '12px 20px', color: 'white', outline: 'none' 
            }} 
          />
          <button type="submit" className="btn btn-primary" disabled={messages.length > 2} style={{ borderRadius: '50%', width: 44, height: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={18} />
          </button>
        </form>
      </div>
      <style>{`
        .typing-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--color-text-secondary);
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
