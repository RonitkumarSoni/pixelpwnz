import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import useChatStore from '../store/chatStore';

export default function MessageList() {
  const { messages, isLoading } = useChatStore();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div
      id="message-list"
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.length === 0 && !isLoading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            opacity: 0.5,
          }}
        >
          <div className="gradient-text text-h2" style={{ fontWeight: 700 }}>
            ✦
          </div>
          <p className="text-body" style={{ color: 'var(--color-text-muted)', textAlign: 'center', maxWidth: 320 }}>
            Start a conversation to see how your clone responds. Type anything below.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* AI Thinking Indicator */}
      {isLoading && (
        <div
          className="page-enter"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: 16,
          }}
        >
          <div className="bubble bubble--clone shimmer">
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
