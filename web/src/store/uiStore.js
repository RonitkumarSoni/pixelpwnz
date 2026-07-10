import { create } from 'zustand';

const useUiStore = create((set) => ({
  // Theme
  theme: localStorage.getItem('signet-theme') || 'dark',

  // Privacy
  privacyAccepted: sessionStorage.getItem('signet-privacy') === 'true',

  // Actions
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('signet-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return { theme: newTheme };
    }),

  setTheme: (theme) => {
    localStorage.setItem('signet-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  acceptPrivacy: () => {
    sessionStorage.setItem('signet-privacy', 'true');
    set({ privacyAccepted: true });
  },

  resetPrivacy: () => {
    sessionStorage.removeItem('signet-privacy');
    set({ privacyAccepted: false });
  },
}));

export default useUiStore;
