import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-family)',
          fontSize: '0.875rem',
          borderRadius: '16px',
          padding: '14px 18px',
          boxShadow: '0 12px 40px rgba(108, 92, 231, 0.12)',
        },
        success: {
          style: { borderLeft: '3px solid var(--color-success)' },
          iconTheme: { primary: 'var(--color-success)', secondary: '#fff' },
        },
        error: {
          style: { borderLeft: '3px solid var(--color-error)' },
          iconTheme: { primary: 'var(--color-error)', secondary: '#fff' },
        },
      }}
    />
  );
}
