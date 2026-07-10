import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertCircle, FileText, Loader, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatStore';
import useUiStore from '../store/uiStore';
import { uploadChat } from '../api/client';
import StatsPanel from '../components/StatsPanel';

export default function UploadPage() {
  const navigate = useNavigate();
  const { setSession } = useChatStore();
  const { theme, toggleTheme } = useUiStore();

  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | success | error
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setErrorMsg('Only .txt files are accepted.');
      setUploadState('error');
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadState('idle');
      setErrorMsg('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    disabled: uploadState === 'uploading',
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a .txt file first.');
      return;
    }
    if (!userName.trim()) {
      toast.error('Please enter your name as it appears in the chat.');
      return;
    }

    setUploadState('uploading');
    setProgress(0);
    setErrorMsg('');

    try {
      const result = await uploadChat(file, userName.trim(), (p) => setProgress(p));
      setUploadState('success');
      setUploadResult(result);
      setSession(
        result.session_id,
        userName.trim(),
        result.contact_name,
        result.total_pairs_extracted
      );
      toast.success(`Successfully parsed ${result.total_pairs_extracted} conversation pairs!`);

      // Navigate to chat after a short delay
      setTimeout(() => navigate('/chat'), 1800);
    } catch (error) {
      setUploadState('error');
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Upload failed. Please check the file and try again.';
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  const getDropzoneClass = () => {
    let cls = 'dropzone';
    if (isDragActive) cls += ' dropzone--active';
    if (uploadState === 'uploading') cls += ' dropzone--uploading';
    if (uploadState === 'success') cls += ' dropzone--success';
    if (uploadState === 'error') cls += ' dropzone--error';
    return cls;
  };

  return (
    <div className="page-enter" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* AI Glow Orbs */}
      <div className="ai-glow" style={{ top: -100, right: -100 }} />
      <div className="ai-glow ai-glow--secondary" style={{ bottom: -80, left: -80 }} />

      {/* Theme Toggle */}
      <button
        className="btn-icon"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 50,
        }}
        id="theme-toggle"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
        className="upload-grid"
      >
        {/* Left – Hero Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h1
              className="text-h1"
              style={{
                marginBottom: 8,
                color: 'var(--color-text)',
              }}
            >
              Signet
            </h1>
            <p
              className="gradient-text"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              Your digital twin. Write like you.
            </p>
          </div>

          <p className="text-body-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: 440 }}>
            Upload your WhatsApp chat export and let Signet learn your writing style. 
            It'll reply to messages exactly like you would — same tone, same vibe, same you.
          </p>

          {/* How to export */}
          <div
            className="card"
            style={{
              padding: 20,
              cursor: 'default',
            }}
          >
            <h3 className="text-small" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              How to export your WhatsApp chat
            </h3>
            <ol
              className="text-body"
              style={{
                color: 'var(--color-text-secondary)',
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <li>Open a chat in WhatsApp</li>
              <li>Tap <strong style={{ color: 'var(--color-text)' }}>⋮ → More → Export Chat</strong></li>
              <li>Choose <strong style={{ color: 'var(--color-text)' }}>"Without Media"</strong></li>
              <li>Save the <code className="text-code" style={{ color: 'var(--color-primary)', background: 'var(--color-surface-elevated)', padding: '2px 6px', borderRadius: 4 }}>.txt</code> file</li>
            </ol>
          </div>
        </div>

        {/* Right – Upload Zone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* User Name Input */}
          <div>
            <label
              className="text-small"
              htmlFor="user-name"
              style={{ color: 'var(--color-text-secondary)', marginBottom: 8, display: 'block' }}
            >
              Your name as it appears in the chat
            </label>
            <input
              id="user-name"
              type="text"
              className="input-field"
              placeholder="e.g., Ronit"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={uploadState === 'uploading' || uploadState === 'success'}
            />
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={getDropzoneClass()}
            id="upload-dropzone"
          >
            <input {...getInputProps()} />

            {uploadState === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <CheckCircle size={48} color="var(--color-success)" />
                <p className="text-h3" style={{ color: 'var(--color-success)' }}>
                  Upload Complete!
                </p>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  Redirecting to chat...
                </p>
              </div>
            ) : uploadState === 'uploading' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
                <Loader size={40} color="var(--color-primary)" className="animate-spin" />
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  {progress < 100 ? 'Uploading file...' : 'Parsing & building embeddings...'}
                </p>
                <div className="progress-bar" style={{ maxWidth: 300 }}>
                  <div
                    className="progress-bar__fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-small" style={{ color: 'var(--color-text-muted)' }}>
                  {progress}%
                </p>
              </div>
            ) : uploadState === 'error' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <AlertCircle size={48} color="var(--color-error)" />
                <p className="text-h3" style={{ color: 'var(--color-error)' }}>
                  Upload Failed
                </p>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: 300 }}>
                  {errorMsg}
                </p>
                <p className="text-small" style={{ color: 'var(--color-text-muted)' }}>
                  Click or drag to try again
                </p>
              </div>
            ) : file ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <FileText size={40} color="var(--color-primary)" />
                <p className="text-h3" style={{ color: 'var(--color-text)' }}>
                  {file.name}
                </p>
                <p className="text-small" style={{ color: 'var(--color-text-secondary)' }}>
                  {(file.size / 1024).toFixed(1)} KB — Click upload to continue
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <UploadCloud
                  size={48}
                  color={isDragActive ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                  className="animate-pulse-soft"
                />
                <p className="text-h3" style={{ color: 'var(--color-text)' }}>
                  {isDragActive ? 'Drop your file here' : 'Drag & drop your WhatsApp .txt here'}
                </p>
                <p className="text-small" style={{ color: 'var(--color-text-muted)' }}>
                  or click to browse • Max 50MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {file && uploadState !== 'success' && uploadState !== 'uploading' && (
            <button
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={!userName.trim()}
              style={{ width: '100%' }}
              id="upload-btn"
            >
              <UploadCloud size={18} />
              Upload & Build Clone
            </button>
          )}

          {/* Success Stats */}
          {uploadState === 'success' && uploadResult && (
            <StatsPanel
              totalPairs={uploadResult.total_pairs_extracted}
              contactName={uploadResult.contact_name}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p className="text-small" style={{ color: 'var(--color-text-muted)', maxWidth: 600, margin: '0 auto' }}>
          Your data is processed in real-time and never stored. Signet respects your privacy. 
          By using this service, you agree to our privacy and ethics guidelines.
        </p>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .upload-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 32px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
