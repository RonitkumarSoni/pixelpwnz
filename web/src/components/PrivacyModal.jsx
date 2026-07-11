import { useState } from 'react';
import { ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import useUiStore from '../store/uiStore';

export default function PrivacyModal() {
  const { privacyAccepted, acceptPrivacy } = useUiStore();
  const [checked, setChecked] = useState(false);

  if (privacyAccepted) return null;

  return (
    <div className="modal-overlay" id="privacy-modal">
      <div className="modal-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)'
          }}>
            <ShieldCheck size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>
              Privacy & Ethics Agreement
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: 2 }}>
              Please read and accept before continuing
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

        {/* Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {[
            { title: 'Data Privacy', desc: 'Your uploaded WhatsApp chat file is processed in real-time and never stored permanently on our servers.' },
            { title: 'Consent', desc: 'You confirm that you have the right to upload this chat data and that other participants\' privacy is respected.' },
            { title: 'Ethical Use', desc: 'The AI clone is for personal use only. You will not use it to impersonate, spread misinformation, or deceive.' },
            { title: 'Session-Based', desc: 'Your session data is temporary and will be purged when the session expires or you click "Clear Session."' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <AlertTriangle size={16} color="var(--color-primary)" style={{ marginTop: 3, flexShrink: 0 }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-text)' }}>{item.title}:</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

        {/* Checkbox */}
        <label className="checkbox-container" style={{ marginBottom: 24 }} id="privacy-checkbox">
          <div className={`checkbox ${checked ? 'checkbox--checked' : ''}`} onClick={() => setChecked(!checked)}>
            {checked && <Check size={14} color="#fff" strokeWidth={3} />}
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            I have read and agree to the privacy and ethics guidelines above.
          </span>
        </label>

        <button
          className="btn btn-primary"
          disabled={!checked}
          onClick={acceptPrivacy}
          style={{ width: '100%' }}
          id="privacy-accept-btn"
        >
          Continue to Signet
        </button>
      </div>
    </div>
  );
}
