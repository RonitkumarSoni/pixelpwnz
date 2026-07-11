import { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

export default function DemoSection() {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Hey! How are you?' }
  ]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (messages.length === 1) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          ...messages,
          { role: 'assistant', content: "I'm good! Just working on some things. How about you? What's up?" }
        ]);
      }, 1500);
    }
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 0' }}>
      
      {/* Demo Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24, padding: '0 24px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            
            {/* Header info for the message */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'assistant' && (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={14} />
                </div>
              )}
              {m.role === 'user' && (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, order: 2 }}>
                  <User size={14} />
                </div>
              )}
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)', order: m.role === 'user' ? 1 : 2 }}>
                {m.role === 'user' ? 'You' : 'AI Clone'}
              </span>
            </div>

            {/* Message Bubble */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                background: m.role === 'user' ? '#F3F4F6' : '#FFFFFF',
                color: 'var(--color-text)',
                padding: '16px 20px',
                borderRadius: '16px',
                borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: m.role === 'assistant' ? 4 : 16,
                border: m.role === 'assistant' ? '1px solid var(--glass-border)' : 'none',
                boxShadow: m.role === 'assistant' ? '0 4px 12px rgba(0,0,0,0.02)' : 'none',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}>
                {m.content}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: 6 }}>11:30 AM</span>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {typing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignSelf: 'flex-start' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={14} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>AI Clone is typing</span>
            </div>
            
            <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: 4, display: 'flex', gap: 4, alignItems: 'center', border: '1px solid var(--glass-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div className="typing-dot-demo"></div>
              <div className="typing-dot-demo" style={{ animationDelay: '0.2s' }}></div>
              <div className="typing-dot-demo" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .typing-dot-demo {
          width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary);
          animation: bounceDemo 1.4s infinite ease-in-out both;
        }
        @keyframes bounceDemo {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
