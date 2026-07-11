import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import useChatStore from '../store/chatStore';

export default function MessageList() {
  const { messages, isLoading, contactName, userName } = useChatStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div id="message-list" style={{
      flex: 1, overflowY: 'auto', padding: '24px 16px',
      display: 'flex', flexDirection: 'column',
    }}>
      {messages.length === 0 && !isLoading && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'rgba(108, 92, 231, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(108, 92, 231, 0.08)'
          }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)' }}>
              {userName ? userName.charAt(0).toUpperCase() : 'S'}
            </span>
          </div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)' }}>
            Start a conversation
          </p>
          <p style={{
            fontSize: '0.875rem', color: 'var(--color-text-muted)',
            textAlign: 'center', maxWidth: 300,
          }}>
            Type anything below to see how your AI clone responds.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isLoading && (
        <div className="page-enter" style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', marginBottom: 16,
        }}>
          <div className="bubble bubble--clone">
            <div className="thinking-dots">
              <div className="thinking-dots__dot" />
              <div className="thinking-dots__dot" />
              <div className="thinking-dots__dot" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
