import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.type === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  };

  return (
    <div
      className="page-enter"
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16,
      }}
    >
      <div className={`bubble ${isUser ? 'bubble--user' : 'bubble--clone'}`}>
        <p style={{ margin: 0 }}>{message.text}</p>
        {!isUser && (
          <button
            onClick={handleCopy}
            title="Copy"
            style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer',
              color: 'var(--color-primary)', padding: 4, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'var(--transition)',
            }}
            className="copy-btn"
          >
            {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
          </button>
        )}
      </div>
      <span className="bubble__timestamp" style={{ textAlign: isUser ? 'right' : 'left' }}>
        {message.timestamp}
      </span>
      <style>{`
        .bubble--clone:hover .copy-btn { opacity: 1 !important; }
        .copy-btn:hover { background: rgba(255,255,255,0.8) !important; }
      `}</style>
    </div>
  );
}
