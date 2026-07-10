import { useState, useEffect } from 'react';
import { X, Activity } from 'lucide-react';
import { getStats } from '../api/client';
import StatsPanel from './StatsPanel';

export default function InsightsModal({ isOpen, onClose, sessionId }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !sessionId) return;

    let mounted = true;
    setIsLoading(true);
    setError(null);

    const fetchStats = async () => {
      try {
        const data = await getStats(sessionId);
        if (mounted) {
          setStats(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.status === 404 ? 'Session expired.' : 'Failed to load stats.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, [isOpen, sessionId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 200 }}>
      <div className="modal-card" style={{ maxWidth: 640 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'linear-gradient(135deg, #6C5CE7, #8B7CF7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)'
            }}>
              <Activity size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>
                Clone Insights
              </h2>
              {stats?.contact_name && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Learned from your chats with <strong style={{ color: 'var(--color-text)' }}>{stats.contact_name}</strong>
                </p>
              )}
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 24 }} />

        {/* Content */}
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: 16 }}>
            <div className="thinking-dots">
              <div className="thinking-dots__dot" />
              <div className="thinking-dots__dot" />
              <div className="thinking-dots__dot" />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono, monospace)' }}>
              Reading your patterns...
            </p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-error)' }}>
            <p>{error}</p>
          </div>
        ) : stats?.total_pairs === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-secondary)' }}>
            <p>Not enough data yet to show insights.</p>
          </div>
        ) : (
          <StatsPanel stats={stats} />
        )}
      </div>
    </div>
  );
}
