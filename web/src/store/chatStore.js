import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  // Session state
  sessionId: null,
  userName: null,
  contactName: null,
  totalPairs: 0,
  temperature: 0.7, // Default temperature

  // Chat messages
  messages: [],
  isLoading: false,

  // Actions
  setTemperature: (temperature) => set({ temperature }),
  setSession: (sessionId, userName, contactName, totalPairs) =>
    set({
      sessionId,
      userName,
      contactName,
      totalPairs,
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...message,
        },
      ],
    })),

  setLoading: (isLoading) => set({ isLoading }),

  clearSession: () =>
    set({
      sessionId: null,
      userName: null,
      contactName: null,
      totalPairs: 0,
      temperature: 0.7,
      messages: [],
      isLoading: false,
    }),

  // Computed
  hasSession: () => !!get().sessionId,
}));

export default useChatStore;
