import React from 'react';

export default function PremiumLoader({ size = 24, color = '#7C6CF6', text = '' }) {
  // Generate the 12 ticks for the classic Apple-style spinner
  const ticks = Array.from({ length: 12 }).map((_, i) => {
    return (
      <rect
        key={i}
        x="11"
        y="1"
        width="2"
        height="6"
        rx="1"
        ry="1"
        fill={color}
        opacity={(i + 1) / 12} // Fade opacity
        transform={`rotate(${i * 30} 12 12)`}
      />
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: 'apple-spin 1s steps(12, end) infinite'
        }}
      >
        {ticks}
      </svg>
      {text && (
        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.01em' }}>
          {text}
        </span>
      )}
      <style>
        {`
          @keyframes apple-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
