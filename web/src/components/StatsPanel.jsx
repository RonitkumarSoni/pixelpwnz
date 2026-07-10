import { Database, MessageSquare, Edit3, Smile } from 'lucide-react';

function StatCard({ icon, label, value, children }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
        cursor: 'default',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(108, 92, 231, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            {label}
          </p>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-mono, monospace)' }}>
            {value}
          </p>
        </div>
      </div>
      {children && <div style={{ width: '100%', marginTop: 4 }}>{children}</div>}
    </div>
  );
}

function EmojiMeter({ frequency }) {
  const width = Math.min(Math.max(frequency * 100, 0), 100) + '%';
  return (
    <div style={{ width: '100%' }}>
      <div className="progress-bar" style={{ height: 6, background: 'var(--color-border)', borderRadius: 3 }}>
        <div 
          className="progress-bar__fill" 
          style={{ width, background: 'var(--color-primary)', borderRadius: 3, transition: 'width 1s ease-out' }}
        />
      </div>
    </div>
  );
}

export default function StatsPanel({ stats }) {
  if (!stats) return null;

  const showCombinedPairs = stats.total_pairs === stats.vector_count;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        width: '100%'
      }}
    >
      {showCombinedPairs ? (
        <StatCard 
          icon={<Database size={18} />} 
          label="Memories Indexed" 
          value={stats.total_pairs} 
        />
      ) : (
        <>
          <StatCard 
            icon={<MessageSquare size={18} />} 
            label="Pairs Extracted" 
            value={stats.total_pairs} 
          />
          <StatCard 
            icon={<Database size={18} />} 
            label="Vectors Indexed" 
            value={stats.vector_count} 
          />
        </>
      )}
      
      <StatCard 
        icon={<Edit3 size={18} />} 
        label="Average Reply Length" 
        value={`${stats.avg_reply_length?.toFixed(1) || 0} words`} 
      />
      
      <StatCard 
        icon={<Smile size={18} />} 
        label="Emoji Usage" 
        value={`${((stats.emoji_frequency || 0) * 100).toFixed(0)}%`}
      >
        <EmojiMeter frequency={stats.emoji_frequency || 0} />
      </StatCard>
    </div>
  );
}
