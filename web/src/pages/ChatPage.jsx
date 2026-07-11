import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Trash2, Send, ArrowLeft, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatStore';
import { sendMessage, clearSession as clearSessionApi, getSessionDetails } from '../api/client';
import MessageList from '../components/MessageList';
import InsightsModal from '../components/InsightsModal';
import DeleteModal from '../components/DeleteModal';
import PremiumLoader from '../components/PremiumLoader';

export default function ChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionIdParam = searchParams.get('session_id');

  const {
    sessionId, userName, contactName, totalPairs,
    addMessage, setLoading, isLoading, clearSession,
    temperature, setTemperature, incrementTotalPairs,
    setSession, setMessages
  } = useChatStore();

  const [inputText, setInputText] = useState('');
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function init() {
      if (!sessionId && sessionIdParam) {
        try {
          const data = await getSessionDetails(sessionIdParam);
          setSession(
            data.session.session_id, 
            data.session.userName, 
            data.session.contact_name, 
            data.session.pair_count
          );
          setMessages(data.messages || []);
        } catch (err) {
          toast.error('Could not load session.');
          navigate('/upload');
        }
      }
      setIsInitializing(false);
    }
    init();
  }, [sessionId, sessionIdParam, setSession, setMessages, navigate]);

  if (isInitializing) {
    return (
      <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PremiumLoader text="Initializing chat..." color="#6c5ce7" size={32} />
      </div>
    );
  }

  // No session → redirect prompt
  if (!sessionId) {
    return (
      <div className="page-enter" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src="/logo.png" alt="Signet Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>No Active Session</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: 360 }}>
          Upload a WhatsApp chat first to start chatting with your AI clone.
        </p>
        <Link to="/upload">
          <button className="btn btn-primary"><ArrowLeft size={18} /> Go to Upload</button>
        </Link>
      </div>
    );
  }

  const handleSend = async () => {
    const msg = inputText.trim();
    if (!msg || isLoading) return;

    addMessage({ type: 'user', text: msg });
    setInputText('');
    setLoading(true);

    try {
      const result = await sendMessage(sessionId, msg, temperature);
      addMessage({ type: 'clone', text: result.reply });
      incrementTotalPairs();
    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        toast.error('Session expired. Please upload again.');
        clearSession();
        navigate('/upload');
        return;
      } else if (status === 429) {
        toast.error('Rate limited. Wait a few seconds.');
      } else {
        toast.error('Something went wrong.');
        addMessage({ type: 'clone', text: "I'll get back to you soon." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleClear = async () => {
    try { await clearSessionApi(sessionId); } catch { /* ok */ }
    clearSession();
    toast.success('Session cleared.');
    navigate('/');
  };

  return (
    <div className="page-enter" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Glassmorphism Top Bar ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--glass-border)',
        flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/">
            <button className="btn-icon" title="Back to home"><ArrowLeft size={20} /></button>
          </Link>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>
              Chatting with <span className="gradient-text">{userName}</span>
            </h2>
            {contactName && (
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: 1 }}>
                Simulating conversation as {contactName}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div 
            className="badge" 
            style={{ cursor: 'pointer', transition: 'all 0.2s ease', ':hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.1)' } }}
            onClick={() => setIsInsightsOpen(true)}
            title="View Insights"
          >
            <span style={{ fontSize: 14 }}>✦</span> {totalPairs} memories loaded <ChevronDown size={14} style={{ opacity: 0.7 }} />
          </div>
          <button className="btn-icon" onClick={() => setIsDeleteModalOpen(true)} title="Clear session" style={{ color: 'var(--color-error)' }} id="clear-session-btn">
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      <InsightsModal 
        isOpen={isInsightsOpen} 
        onClose={() => setIsInsightsOpen(false)} 
        sessionId={sessionId} 
      />

      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleClear} 
      />

      {/* ── Chat Container ── */}
      <div style={{
        flex: 1, maxWidth: 768, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <MessageList />
      </div>

      {/* ── Glassmorphism Input Bar ── */}
      <div style={{
        padding: '12px 24px 24px',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderTop: '1px solid var(--glass-border)',
        flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 768, margin: '0 auto' }}>


          <div className="chat-input-container" id="chat-input-container">
            <input
              className="chat-input" type="text"
              placeholder={`Type a message as if texting ${contactName || 'someone'}...`}
              value={inputText} onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown} disabled={isLoading}
              id="chat-input" autoComplete="off"
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={!inputText.trim() || isLoading} title="Send" id="send-btn">
              <Send size={18} style={{ marginLeft: 2 }} />
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 8 }}>
            Signet responds based on {totalPairs} conversation pairs
          </p>
        </div>
      </div>
    </div>
  );
}
