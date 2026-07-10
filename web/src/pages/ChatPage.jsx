import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Sparkles, Send, Sun, Moon, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatStore';
import useUiStore from '../store/uiStore';
import { sendMessage, clearSession as clearSessionApi } from '../api/client';
import MessageList from '../components/MessageList';

export default function ChatPage() {
  const navigate = useNavigate();
  const {
    sessionId,
    userName,
    contactName,
    totalPairs,
    addMessage,
    setLoading,
    isLoading,
    clearSession,
  } = useChatStore();
  const { theme, toggleTheme } = useUiStore();

  const [inputText, setInputText] = useState('');

  // Redirect if no session
  if (!sessionId) {
    return (
      <div
        className="page-enter"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <p className="text-h2" style={{ color: 'var(--color-text)' }}>No Active Session</p>
        <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
          Upload a WhatsApp chat first to start chatting with your clone.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          Go to Upload
        </button>
      </div>
    );
  }

  const handleSend = async () => {
    const message = inputText.trim();
    if (!message || isLoading) return;

    // Add user message
    addMessage({ type: 'user', text: message });
    setInputText('');
    setLoading(true);

    try {
      const result = await sendMessage(sessionId, message);
      addMessage({ type: 'clone', text: result.reply });
    } catch (error) {
      const status = error.response?.status;

      if (status === 404) {
        toast.error('Session expired. Please upload again.');
        clearSession();
        navigate('/');
        return;
      } else if (status === 429) {
        toast.error('Rate limited. Please wait 10 seconds.');
      } else if (status === 503 || status === 504) {
        toast.error('AI service is unavailable. Retrying...');
        // Fallback reply
        addMessage({
          type: 'clone',
          text: "I'll get back to you soon.",
        });
      } else {
        toast.error('Something went wrong. Please try again.');
        addMessage({
          type: 'clone',
          text: "I'll get back to you soon.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearSession = async () => {
    try {
      await clearSessionApi(sessionId);
      toast.success('Session cleared successfully.');
    } catch {
      // Continue even if API fails
    }
    clearSession();
    navigate('/');
  };

  return (
    <div
      className="page-enter"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* AI Glow behind chat */}
      <div
        className="ai-glow"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
        }}
      />

      {/* ── Top Navigation Bar ── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          position: 'relative',
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Back button */}
          <button
            className="btn-icon"
            onClick={() => navigate('/')}
            title="Back to upload"
            id="back-btn"
          >
            <ArrowLeft size={20} />
          </button>

          {/* User info */}
          <div>
            <h2 className="text-h3" style={{ color: 'var(--color-text)' }}>
              Conversing as <span className="gradient-text">{userName}</span>
            </h2>
            {contactName && (
              <p className="text-small" style={{ color: 'var(--color-text-secondary)', marginTop: 2 }}>
                Chatting with {contactName}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Stats Badge */}
          <div className="badge" id="memory-badge">
            <Sparkles size={14} color="var(--color-primary)" />
            <span>{totalPairs} memories loaded</span>
          </div>

          {/* Theme Toggle */}
          <button
            className="btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            id="chat-theme-toggle"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Clear Session */}
          <button
            className="btn-icon"
            onClick={handleClearSession}
            title="Clear session & data"
            style={{ color: 'var(--color-error)' }}
            id="clear-session-btn"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* ── Chat Container ── */}
      <div
        style={{
          flex: 1,
          maxWidth: 768,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <MessageList />
      </div>

      {/* ── Input Area (Fixed Bottom) ── */}
      <div
        style={{
          padding: '12px 20px 20px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          position: 'relative',
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: 768,
            margin: '0 auto',
          }}
        >
          <div className="chat-input-container" id="chat-input-container">
            <input
              className="chat-input"
              type="text"
              placeholder={`Type a message as if texting ${contactName || 'someone'}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              id="chat-input"
              autoComplete="off"
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              title="Send message"
              id="send-btn"
            >
              <Send size={18} style={{ marginLeft: 2 }} />
            </button>
          </div>
          <p
            className="text-small"
            style={{
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Signet responds based on {totalPairs} conversation pairs from your chat history
          </p>
        </div>
      </div>
    </div>
  );
}
