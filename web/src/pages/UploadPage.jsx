import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, Link } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertCircle, FileText, Loader, ArrowLeft, Shield, Upload, Cpu, User, MessageCircle, ChevronDown, ChevronUp, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatStore';
import { uploadChat } from '../api/client';
import DashboardLayout from '../components/DashboardLayout';

// Local FAQ Item Component
function FaqItem({ question, answer, c }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${c.borderMain}`, padding: '16px 0' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontSize: '1rem', fontWeight: 600, color: c.textMain, textAlign: 'left'
        }}
      >
        {question}
        {isOpen ? <ChevronUp size={20} color={c.textMuted} /> : <ChevronDown size={20} color={c.textMuted} />}
      </button>
      {isOpen && (
        <p style={{ marginTop: 12, color: c.textMuted, fontSize: '0.95rem', lineHeight: 1.6 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function UploadPage() {
  return (
    <DashboardLayout activeTab="Create">
      <UploadContent />
    </DashboardLayout>
  );
}

function UploadContent({ c, isDark }) {
  const navigate = useNavigate();
  const { setSession } = useChatStore();

  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | success | error
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length > 0) {
      setErrorMsg('Only .txt files are currently supported.');
      setUploadState('error');
      return;
    }
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setUploadState('idle');
      setErrorMsg('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
    disabled: uploadState === 'uploading',
  });

  const handleUpload = async () => {
    if (!file) { toast.error('Select a .txt file first.'); return; }
    if (!userName.trim()) { toast.error('Enter your name as it appears in the chat.'); return; }

    setUploadState('uploading');
    setProgress(0);
    setErrorMsg('');

    try {
      const result = await uploadChat(file, userName.trim(), (p) => setProgress(p));
      setUploadState('success');
      setSession(result.session_id, userName.trim(), result.contact_name, result.total_pairs_extracted);
      toast.success(`Parsed ${result.total_pairs_extracted} conversation pairs!`);
      setTimeout(() => navigate(`/chat?session_id=${result.session_id}`), 1500);
    } catch (error) {
      setUploadState('error');
      const msg = error.response?.data?.message || error.response?.data?.error || error.message || 'Upload failed. Check the file and try again.';
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  const dropzoneClass = `dropzone-clean${isDragActive ? ' active' : ''}${uploadState === 'success' ? ' success' : ''}${uploadState === 'error' ? ' error' : ''}`;

  if (!c) return null;

  return (
    <>
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ margin: '0 auto', width: '100%' }}>
          
          {/* ── Header Area ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
            
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 500 }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                Home
              </Link>
              <span style={{ color: c.textLight }}>›</span>
              <span style={{ color: c.textMuted }}>Upload Your Chat</span>
            </div>

            {/* Title & Badge Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
              <div style={{ maxWidth: 500 }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em', color: c.textMain }}>
                  Upload <span className="gradient-text">Your Chat</span>
                </h1>
                <p style={{ fontSize: '1rem', color: c.textMuted, lineHeight: 1.6 }}>
                  Upload your exported WhatsApp chat file to create your personalized AI clone.
                </p>
              </div>

              {/* Security Badge */}
              <div style={{ 
                background: c.cardBgSolid, padding: '16px 20px', borderRadius: 16, border: `1px solid ${c.borderMain}`,
                display: 'flex', gap: 16, maxWidth: 320, boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4, color: c.textMain }}>Your Data is Private & Secure</h4>
                  <p style={{ fontSize: '0.8rem', color: c.textMuted, lineHeight: 1.5 }}>We never store or share your files. 100% private and encrypted.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Dropzone Area ── */}
          <div style={{ 
            background: c.cardBg, border: `1px solid ${c.borderMain}`, borderRadius: 24, padding: '40px',
            boxShadow: `0 10px 40px ${c.shadowSmall}`, marginBottom: 40
          }}>
            <div {...getRootProps()} className={dropzoneClass} style={{
              background: isDark ? 'rgba(0,0,0,0.2)' : '#FAFAFD',
              border: '2px dashed rgba(108, 92, 231, 0.25)',
              borderRadius: 24,
              padding: '80px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: 320
            }}>
              <input {...getInputProps()} />
              
              {uploadState === 'success' ? (
                <>
                  <CheckCircle size={56} color="#10B981" style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10B981', marginBottom: 8 }}>Clone Authenticated</h3>
                  <p style={{ color: c.textMuted }}>Entering chat session...</p>
                </>
              ) : uploadState === 'uploading' ? (
                <>
                  <Loader size={48} color="#6C5CE7" className="animate-spin" style={{ marginBottom: 16 }} />
                  <p style={{ color: c.textMuted, marginBottom: 16 }}>{progress < 100 ? 'Analyzing conversational patterns...' : 'Forging your digital twin...'}</p>
                  <div style={{ width: '100%', height: 6, background: '#F0F0F5', borderRadius: 3, overflow: 'hidden', maxWidth: 200 }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#6C5CE7', transition: 'width 0.3s ease' }} />
                  </div>
                </>
              ) : uploadState === 'error' ? (
                <>
                  <AlertCircle size={56} color="#EF4444" style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#EF4444', marginBottom: 8 }}>Upload Failed</h3>
                  <p style={{ color: c.textMuted, maxWidth: 300, margin: '0 auto' }}>{errorMsg}</p>
                </>
              ) : file ? (
                <>
                  <FileText size={56} color="#6C5CE7" style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: c.textMain, marginBottom: 8 }}>{file.name}</h3>
                  <p style={{ color: c.textMuted }}>{(file.size / 1024).toFixed(1)} KB • Click to change</p>
                </>
              ) : (
                <>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <UploadCloud size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: c.textMain, marginBottom: 12 }}>
                    Drag & drop your chat file here
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: c.textMuted, marginBottom: 20 }}>or</p>
                  <button className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: 10, fontSize: '0.95rem', marginBottom: 24 }}>
                    Choose File
                  </button>
                  <div style={{ fontSize: '0.85rem', color: c.textLight, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span>Supports WhatsApp .txt export files</span>
                    <span>Max file size: 50MB</span>
                  </div>
                </>
              )}
            </div>

            {/* Input & Upload Button (Conditional) */}
            {file && uploadState !== 'success' && uploadState !== 'uploading' && (
              <div style={{ marginTop: 32, padding: '0 24px', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 600, color: c.textMain, marginBottom: 10, display: 'block' }}>
                    Your Name (as it appears in the chat)
                  </label>
                  <input
                    type="text" 
                    style={{
                      width: '100%', padding: '14px 20px', background: c.cardBg,
                      border: `1px solid ${c.borderMain}`, borderRadius: 12,
                      fontSize: '1rem', color: c.textMain, outline: 'none'
                    }}
                    placeholder="e.g., Alex"
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleUpload} 
                  disabled={!userName.trim()} 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '16px', borderRadius: 12, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <UploadCloud size={20} /> Upload & Build Clone
                </button>
              </div>
            )}
          </div>

          {/* ── Supported Formats ── */}
          <div style={{ marginBottom: 60 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: c.textMain }}>Supported Formats</h3>
            <p style={{ fontSize: '0.95rem', color: c.textMuted, marginBottom: 24 }}>Export your chat from any platform and upload it here.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {/* WhatsApp */}
              <div className="glass-card" style={{ padding: 24, flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, color: c.textMain }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageCircle size={16} />
                    </div>
                    WhatsApp Export
                  </div>
                  <span style={{ fontSize: '0.75rem', background: c.borderMain, padding: '4px 8px', borderRadius: 4, color: c.textMuted }}>.txt</span>
                </div>
                <ol style={{ paddingLeft: 16, margin: 0, color: c.textMuted, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: 12, lineHeight: 1.5 }}>
                  <li>Open WhatsApp chat</li>
                  <li>Tap <strong>More options (⋮)</strong></li>
                  <li>Select <strong>Export chat</strong></li>
                  <li>Choose <strong>Without Media</strong></li>
                  <li>Save the .txt file and upload</li>
                </ol>
              </div>
            </div>
          </div>

          {/* ── What Happens Next ── */}
          <div style={{ marginBottom: 60 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 32, color: c.textMain }}>What Happens Next?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', gap: 24 }}>
              
              <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Upload size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 8, color: c.textMain }}>1. Upload File</h4>
                <p style={{ fontSize: '0.85rem', color: c.textMuted, lineHeight: 1.5 }}>Upload your exported chat file securely.</p>
              </div>

              <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Cpu size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 8, color: c.textMain }}>2. AI Processing</h4>
                <p style={{ fontSize: '0.85rem', color: c.textMuted, lineHeight: 1.5 }}>We analyze tone, style, patterns & personality.</p>
              </div>

              <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <User size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 8, color: c.textMain }}>3. Create Clone</h4>
                <p style={{ fontSize: '0.85rem', color: c.textMuted, lineHeight: 1.5 }}>Your AI clone is created based on your data.</p>
              </div>

              <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <MessageCircle size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 8, color: c.textMain }}>4. Start Chatting</h4>
                <p style={{ fontSize: '0.85rem', color: c.textMuted, lineHeight: 1.5 }}>Talk to your AI clone anytime, anywhere.</p>
              </div>
            </div>
          </div>

          {/* ── Local FAQ Section ── */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 24, color: c.textMain }}>Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FaqItem 
                c={c}
                question="Is my data safe?" 
                answer="Yes. We prioritize your privacy. Chat files are processed locally or via encrypted transit and are never permanently stored on our servers." 
              />
              <FaqItem 
                c={c}
                question="What file formats are supported?" 
                answer="Currently, we support .txt files (like WhatsApp exports). We are actively working on adding support for Telegram (.json) and generic .csv files." 
              />
              <FaqItem 
                c={c}
                question="How long does it take to create my AI clone?" 
                answer="It typically takes less than 30 seconds depending on the size of your chat history. Our AI analyzes your message patterns and vocabulary rapidly." 
              />
              <FaqItem 
                c={c}
                question="Can I delete my data later?" 
                answer="Absolutely. You can clear your session at any time from the chat interface, which instantly drops your memory collection from the database." 
              />
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .dropzone-clean:hover { border-color: #6C5CE7 !important; background: rgba(255, 255, 255, 0.8) !important; }
        .dropzone-clean.active { border-color: #6C5CE7 !important; background: rgba(255, 255, 255, 0.9) !important; }
        .dropzone-clean.success { border-color: #10B981 !important; border-style: solid !important; }
        .dropzone-clean.error { border-color: #EF4444 !important; border-style: solid !important; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
