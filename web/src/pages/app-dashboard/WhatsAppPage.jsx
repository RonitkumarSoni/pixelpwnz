import React, { useState, useEffect } from 'react';
import { Smartphone, Link as LinkIcon, Power, CheckCircle, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import apiClient from '../../api/client';
import useUiStore from '../../store/uiStore';

export default function WhatsAppPage() {
  return (
    <DashboardLayout activeTab="WhatsApp Link">
      <WhatsAppContent />
    </DashboardLayout>
  );
}

function WhatsAppContent() {
  const { theme } = useUiStore();
  const isDark = theme === 'dark';
  const c = {
    bg: isDark ? '#0f0e17' : '#f8f9fa',
    cardBg: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
    cardBgSolid: isDark ? '#1a1924' : '#ffffff',
    cardBgHighlight: isDark ? '#232232' : '#f0f4f8',
    textMain: isDark ? '#fffffe' : '#2d3436',
    textDark: isDark ? '#ffffff' : '#1e272e',
    textMuted: isDark ? '#a7a9be' : '#636e72',
    borderMain: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    borderSubtle: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
    shadowOuter: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(108,92,231,0.08)',
  };

  const [status, setStatus] = useState('disconnected');
  const [qrCode, setQrCode] = useState(null);
  const [autoPilot, setAutoPilot] = useState({ enabled: false, sessionId: null, waitTimeMs: 30000, allowedChats: [] });
  const [sessions, setSessions] = useState([]);
  const [showBotSetup, setShowBotSetup] = useState(false);
  const [whatsAppChats, setWhatsAppChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);

  useEffect(() => {
    // Fetch user sessions for the dropdown
    apiClient.get('/sessions').then(res => {
      if (res.data.success) {
        setSessions(res.data.sessions);
        if (res.data.sessions.length > 0 && !autoPilot.sessionId) {
          setAutoPilot(prev => ({ ...prev, sessionId: res.data.sessions[0].session_id }));
        }
      }
    });

    const checkStatus = () => {
      apiClient.get('/whatsapp/status')
        .then(res => {
          if (res.data.success) {
            setStatus(res.data.status);
            setQrCode(res.data.qrCodeStr);
            setAutoPilot(prev => ({
              ...prev,
              ...res.data.autoPilotConfig,
              sessionId: res.data.autoPilotConfig.sessionId || prev.sessionId,
              allowedChats: res.data.autoPilotConfig.allowedChats || prev.allowedChats
            }));
          }
        })
        .catch(console.error);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch chats when status becomes connected
  useEffect(() => {
    if (status === 'connected' && whatsAppChats.length === 0 && !loadingChats) {
      setLoadingChats(true);
      apiClient.get('/whatsapp/chats')
        .then(res => {
          if (res.data.success) {
            setWhatsAppChats(res.data.chats);
          }
        })
        .catch(console.error)
        .finally(() => setLoadingChats(false));
    }
  }, [status, whatsAppChats.length, loadingChats]);

  const handleInit = async () => {
    try {
      await apiClient.post('/whatsapp/init');
      setStatus('loading');
      toast.success('Starting WhatsApp Client...');
    } catch (err) {
      toast.error('Failed to start client');
    }
  };

  const handleToggleAutoPilot = async (enabled) => {
    try {
      const targetSessionId = autoPilot.sessionId || (sessions.length > 0 ? sessions[0].session_id : '');
      const res = await apiClient.post('/whatsapp/toggle', {
        ...autoPilot,
        sessionId: targetSessionId,
        enabled
      });
      if (res.data.autoPilotConfig) {
        setAutoPilot(res.data.autoPilotConfig);
      }
      toast.success(enabled ? 'Auto-Pilot Enabled' : 'Auto-Pilot Disabled');
    } catch (err) {
      toast.error('Failed to toggle Auto-Pilot');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ 
        background: c.cardBg, backdropFilter: 'blur(12px)',
        borderRadius: '24px', boxShadow: `4px 4px 15px ${c.shadowOuter}`,
        padding: '32px', border: `1px solid ${c.borderMain}`
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: c.textMain, marginBottom: '8px' }}>WhatsApp Auto-Pilot</h1>
        <p style={{ color: c.textMuted, marginBottom: '32px' }}>Link your WhatsApp account to let your AI Clone reply for you when you step away.</p>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Connection Card */}
          <div style={{ flex: '1 1 300px', background: c.cardBgSolid, borderRadius: '20px', padding: '24px', border: `1px solid ${c.borderSubtle}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isDark ? 'rgba(46, 213, 115, 0.1)' : '#e0faea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={20} color="#2ed573" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: c.textDark }}>Connection Status</h3>
                <span style={{ fontSize: '0.85rem', color: status === 'connected' ? '#2ed573' : c.textMuted, fontWeight: 600 }}>
                  {status.toUpperCase()}
                </span>
              </div>
            </div>

            {status === 'disconnected' && (
              <button 
                onClick={handleInit}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#6c5ce7', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                Connect to WhatsApp
              </button>
            )}

            {status === 'connected' && !showBotSetup && (
              <button 
                onClick={() => setShowBotSetup(true)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#6c5ce7', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                Connect for Bot
              </button>
            )}

            {status === 'loading' && (
              <div style={{ textAlign: 'center', color: c.textMuted, padding: '24px 0' }}>
                Loading WhatsApp Engine...
              </div>
            )}

            {status === 'authenticating' && (
              <div style={{ textAlign: 'center', color: '#6c5ce7', padding: '24px 0', fontWeight: 600 }}>
                Authenticated! Syncing chats... This may take up to 20 seconds.
              </div>
            )}

            {status === 'qr' && qrCode && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', display: 'inline-block', marginBottom: '16px' }}>
                  <QRCodeSVG value={qrCode} size={200} />
                </div>
                <p style={{ fontSize: '0.85rem', color: c.textMuted }}>Scan this QR code from your WhatsApp App (Linked Devices)</p>
              </div>
            )}

            {status === 'connected' && showBotSetup && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle size={48} color="#2ed573" style={{ marginBottom: '16px' }} />
                <p style={{ color: c.textMain, fontWeight: 600, marginBottom: '24px' }}>Successfully Linked to WhatsApp</p>
              </div>
            )}
          </div>

          {/* Auto-Pilot Settings */}
          <div style={{ flex: '1 1 300px', background: c.cardBgSolid, borderRadius: '20px', padding: '24px', border: `1px solid ${c.borderSubtle}`, opacity: (status === 'connected' && showBotSetup) ? 1 : 0.5, pointerEvents: (status === 'connected' && showBotSetup) ? 'auto' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isDark ? 'rgba(108,92,231,0.1)' : '#f3efff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Power size={20} color="#6c5ce7" />
              </div>
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: c.textDark }}>Auto-Pilot Engine</h3>
              </div>
              <div 
                onClick={() => handleToggleAutoPilot(!autoPilot.enabled)}
                style={{ 
                  width: '48px', height: '24px', borderRadius: '12px', background: autoPilot.enabled ? '#6c5ce7' : c.borderMain,
                  position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
                }}
              >
                <div style={{ 
                  width: '20px', height: '20px', borderRadius: '50%', background: '#fff', 
                  position: 'absolute', top: '2px', left: autoPilot.enabled ? '26px' : '2px', transition: 'left 0.3s'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: c.textMuted, marginBottom: '8px', fontWeight: 600 }}>Active Clone Brain</label>
                <select 
                  value={autoPilot.sessionId || ''}
                  onChange={(e) => {
                  const newConfig = { ...autoPilot, sessionId: e.target.value };
                  setAutoPilot(newConfig);
                  apiClient.post('/whatsapp/toggle', newConfig);
                }}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', background: c.cardBgHighlight, border: `1px solid ${c.borderSubtle}`, color: c.textMain, outline: 'none' }}
                >
                  {sessions.length === 0 && <option value="" disabled>No Personas available. Create or Bookmark one!</option>}
                  {sessions.map(s => (
                    <option key={s.session_id} value={s.session_id}>
                      {s.is_predefined ? `${s.contact_name} (Predefined Persona)` : `${s.contact_name} / ${s.userName} (Custom)`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: c.textMuted, marginBottom: '8px', fontWeight: 600 }}>Wait Time (Timeout)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={16} color={c.textMuted} />
                  <input 
                    type="range" min="10000" max="120000" step="10000"
                    value={autoPilot.waitTimeMs}
                    onChange={(e) => {
                      const newConfig = { ...autoPilot, waitTimeMs: parseInt(e.target.value) };
                      setAutoPilot(newConfig);
                    }}
                    onMouseUp={() => { if (autoPilot.enabled) apiClient.post('/whatsapp/toggle', autoPilot); }}
                    style={{ flexGrow: 1 }}
                  />
                  <span style={{ fontSize: '0.85rem', color: c.textMain, fontWeight: 600 }}>{autoPilot.waitTimeMs / 1000}s</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: c.textMuted, marginTop: '8px', lineHeight: 1.5 }}>
                  If a friend messages you and you don't reply within {autoPilot.waitTimeMs / 1000} seconds, the AI Clone will automatically reply. If you reply manually, the timer cancels.
                </p>
              </div>

              {/* Chat Selection UI moved here */}
              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: c.textMuted, marginBottom: '8px', fontWeight: 600 }}>Select Allowed Chats</label>
                <p style={{ fontSize: '0.75rem', color: c.textMuted, marginBottom: '12px', lineHeight: 1.5 }}>
                  Choose which contacts the Auto-Pilot should reply to. Groups are automatically ignored.
                </p>
                <div style={{ background: c.cardBgHighlight, padding: '12px', borderRadius: '12px', border: `1px solid ${c.borderSubtle}` }}>
                  {loadingChats ? (
                    <p style={{ fontSize: '0.85rem', color: c.textMuted }}>Loading recent chats...</p>
                  ) : whatsAppChats.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: c.textMuted }}>No direct chats found.</p>
                  ) : (
                    <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '8px' }}>
                      {whatsAppChats.map(chat => {
                        const isSelected = autoPilot.allowedChats.includes(chat.id);
                        return (
                          <label key={chat.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '8px', background: c.cardBgSolid, border: `1px solid ${isSelected ? '#6c5ce7' : c.borderSubtle}`, transition: 'all 0.2s' }}>
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={(e) => {
                                let newAllowed = [...autoPilot.allowedChats];
                                if (e.target.checked) {
                                  newAllowed.push(chat.id);
                                } else {
                                  newAllowed = newAllowed.filter(id => id !== chat.id);
                                }
                                const newConfig = { ...autoPilot, allowedChats: newAllowed };
                                setAutoPilot(newConfig);
                                apiClient.post('/whatsapp/toggle', newConfig);
                              }}
                              style={{ accentColor: '#6c5ce7', width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                            <div style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '0.9rem', color: c.textMain, fontWeight: isSelected ? 600 : 400 }}>{chat.name}</span>
                            </div>
                            {chat.unreadCount > 0 && (
                              <span style={{ fontSize: '0.75rem', background: '#6c5ce7', color: '#fff', padding: '2px 8px', borderRadius: '99px', fontWeight: 700 }}>
                                {chat.unreadCount}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
