import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertCircle, FileText, Loader, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatStore';
import { uploadChat } from '../api/client';

export default function UploadPage() {
  const navigate = useNavigate();
  const { setSession } = useChatStore();

  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | success | error
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length > 0) {
      setErrorMsg('Only .txt files are accepted.');
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
      setTimeout(() => navigate('/chat'), 1500);
    } catch (error) {
      setUploadState('error');
      const msg = error.response?.data?.message || error.response?.data?.error || 'Upload failed. Check the file and try again.';
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  const dropzoneClass = `dropzone-clean${isDragActive ? ' active' : ''}${uploadState === 'success' ? ' success' : ''}${uploadState === 'error' ? ' error' : ''}`;

  return (
    <div className="page-enter" style={{ 
      minHeight: '100vh', 
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>

      <div style={{
        maxWidth: 1180, 
        width: '100%',
        display: 'grid', 
        gridTemplateColumns: '45% 55%',
        gap: 80, 
        alignItems: 'start',
      }}>
        {/* ── Left Side: Instructions ── */}
        <div>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              background: 'none', border: 'none', color: '#888B9E', 
              cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center'
            }}
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>

          <h1 style={{ 
            fontSize: '3.5rem', 
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#12121A',
            marginBottom: 16,
            letterSpacing: '-0.02em'
          }}>
            Upload Your<br />
            <span style={{ 
              background: 'linear-gradient(90deg, #6C5CE7, #8B7CF7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Chat History</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#6B6F8A', 
            lineHeight: 1.6, 
            marginBottom: 40,
            maxWidth: 400
          }}>
            Export your WhatsApp chat as a{' '}
            <span style={{
              background: '#EDEEFF', 
              color: '#6C5CE7',
              padding: '4px 8px', 
              borderRadius: 6, 
              fontWeight: 600,
              fontSize: '0.9375rem'
            }}>.txt</span> file and upload it here.
          </p>

          {/* How to export card */}
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 24,
            padding: '40px',
            boxShadow: 'var(--glass-shadow)',
            border: '1px solid var(--glass-border)'
          }}>
            <h3 style={{
              fontSize: '0.8125rem', 
              fontWeight: 700, 
              textTransform: 'uppercase',
              letterSpacing: '0.08em', 
              color: '#9BA3BA', 
              marginBottom: 32,
            }}>
              How to export from WhatsApp
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex', 
              flexDirection: 'column', 
              gap: 20, 
              fontSize: '1.0625rem', 
              color: '#6B728E' 
            }}>
              <li>
                Open a chat in WhatsApp
              </li>
              <li>
                Tap <strong style={{ color: '#000000', fontWeight: 600 }}>⋮ → More → Export Chat</strong>
              </li>
              <li>
                Choose <strong style={{ color: '#000000', fontWeight: 600 }}>"Without Media"</strong>
              </li>
              <li>
                Save the <strong style={{ color: '#6C5CE7', fontWeight: 600 }}>.txt</strong> file
              </li>
            </ul>
          </div>
        </div>

        {/* ── Right Side: Upload Form ── */}
        <div style={{ paddingTop: 60 }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              fontSize: '0.9375rem', 
              fontWeight: 700, 
              color: '#3D3E52', 
              marginBottom: 10, 
              display: 'block' 
            }}>
              Your name as it appears in the chat
            </label>
            <input
              id="user-name" 
              type="text" 
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: 12,
                fontSize: '1rem',
                color: '#12121A',
                boxShadow: 'var(--glass-shadow)',
                outline: 'none'
              }}
              placeholder="e.g., Ronit"
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              disabled={uploadState === 'uploading' || uploadState === 'success'}
            />
          </div>

          {/* Dropzone */}
          <div {...getRootProps()} className={dropzoneClass} style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '2px dashed rgba(108, 92, 231, 0.25)',
            boxShadow: 'var(--glass-shadow)',
            borderRadius: 24,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minHeight: 280
          }}>
            <input {...getInputProps()} />
            
            {uploadState === 'success' ? (
              <>
                <CheckCircle size={56} color="#10B981" style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10B981', marginBottom: 8 }}>Clone Authenticated</h3>
                <p style={{ color: '#6B6F8A' }}>Entering chat session...</p>
              </>
            ) : uploadState === 'uploading' ? (
              <>
                <Loader size={48} color="#6C5CE7" className="animate-spin" style={{ marginBottom: 16 }} />
                <p style={{ color: '#6B6F8A', marginBottom: 16 }}>{progress < 100 ? 'Analyzing conversational patterns...' : 'Forging your digital twin...'}</p>
                <div style={{ width: '100%', height: 6, background: '#F0F0F5', borderRadius: 3, overflow: 'hidden', maxWidth: 200 }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: '#6C5CE7', transition: 'width 0.3s ease' }} />
                </div>
              </>
            ) : uploadState === 'error' ? (
              <>
                <AlertCircle size={56} color="#EF4444" style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#EF4444', marginBottom: 8 }}>Upload Failed</h3>
                <p style={{ color: '#6B6F8A', maxWidth: 280 }}>{errorMsg}</p>
              </>
            ) : file ? (
              <>
                <FileText size={56} color="#6C5CE7" style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#12121A', marginBottom: 4 }}>{file.name}</h3>
                <p style={{ color: '#6B6F8A' }}>{(file.size / 1024).toFixed(1)} KB</p>
              </>
            ) : (
              <>
                <UploadCloud size={64} color="#888B9E" strokeWidth={1.5} style={{ marginBottom: 20 }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#12121A', marginBottom: 8 }}>
                  Drag & drop your WhatsApp .txt
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#9B9FB5' }}>
                  or click to browse • Max 50MB
                </p>
              </>
            )}
          </div>

          {file && uploadState !== 'success' && uploadState !== 'uploading' && (
            <button 
              onClick={handleUpload} 
              disabled={!userName.trim()} 
              style={{
                width: '100%',
                padding: '16px',
                background: '#6C5CE7',
                color: 'white',
                border: 'none',
                borderRadius: 14,
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 8px 24px rgba(108, 92, 231, 0.3)'
              }}
            >
              <UploadCloud size={20} /> Upload & Build Clone
            </button>
          )}
        </div>
      </div>

      <style>{`
        .dropzone-clean:hover { border-color: #6C5CE7 !important; background: rgba(255, 255, 255, 0.8) !important; box-shadow: var(--glass-shadow-hover) !important; }
        .dropzone-clean.active { border-color: #6C5CE7 !important; background: rgba(255, 255, 255, 0.9) !important; box-shadow: var(--glass-shadow-hover) !important; }
        .dropzone-clean.success { border-color: #10B981 !important; border-style: solid !important; }
        .dropzone-clean.error { border-color: #EF4444 !important; border-style: solid !important; }
        
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          div[style*="paddingTop: 60"] {
            padding-top: 0 !important;
          }
          .page-enter {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
