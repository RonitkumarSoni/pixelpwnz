import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        className: 'toast-custom',
        style: {
          background: 'rgba(21, 21, 21, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-family)',
          fontSize: '0.875rem',
          borderRadius: 12,
          padding: '12px 16px',
        },
        success: {
          style: {
            borderLeft: '3px solid var(--color-success)',
          },
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            borderLeft: '3px solid var(--color-error)',
          },
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
