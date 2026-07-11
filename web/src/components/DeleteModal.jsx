import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 200 }}>
      <div className="modal-card" style={{ maxWidth: 400, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#EF4444'
          }}>
            <AlertTriangle size={28} />
          </div>
          
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
              {title || 'Delete Clone?'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {message || 'Are you sure you want to delete this clone? This action cannot be undone.'}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
            <button 
              className="btn" 
              onClick={onClose}
              style={{ flex: 1, padding: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, fontWeight: 600, color: 'var(--color-text)' }}
            >
              Cancel
            </button>
            <button 
              className="btn" 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{ flex: 1, padding: '12px', background: '#EF4444', border: 'none', borderRadius: 12, fontWeight: 600, color: '#FFF' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
