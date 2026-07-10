import { Database, Sparkles, MessageSquare } from 'lucide-react';

export default function StatsPanel({ totalPairs, contactName }) {
  const stats = [
    {
      icon: <Database size={18} />,
      label: 'Pairs Extracted',
      value: totalPairs,
      color: 'var(--color-primary)',
    },
    {
      icon: <MessageSquare size={18} />,
      label: 'Contact',
      value: contactName || '—',
      color: 'var(--color-primary-light)',
    },
    {
      icon: <Sparkles size={18} />,
      label: 'Clone Status',
      value: 'Ready',
      color: 'var(--color-success)',
    },
  ];

  return (
    <div
      className="page-enter"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12,
        marginTop: 16,
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card"
          style={{
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'default',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `${stat.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stat.color,
              flexShrink: 0,
            }}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-small" style={{ color: 'var(--color-text-secondary)' }}>
              {stat.label}
            </p>
            <p className="text-body" style={{ fontWeight: 600, color: 'var(--color-text)' }}>
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
