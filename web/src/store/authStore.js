import { create } from 'zustand';
import { getProfile, loginUser, registerUser } from '../api/client';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('signet_token') || null,
  isAuthenticated: !!localStorage.getItem('signet_token'),
  isLoading: true, // starts true until we check token
  error: null,

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginUser(email, password);
      if (data.success && data.token) {
        localStorage.setItem('signet_token', data.token);
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  // Register
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerUser(email, password, name);
      if (data.success && data.token) {
        localStorage.setItem('signet_token', data.token);
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Registration failed', 
        isLoading: false 
      });
      return false;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('signet_token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Check Auth / Load Profile
  checkAuth: async () => {
    const { token } = get();
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    try {
      const data = await getProfile();
      if (data.success) {
        set({ user: data.user, isAuthenticated: true, isLoading: false });
      } else {
        // Token might be invalid
        get().logout();
      }
    } catch (error) {
      // 401 or 403 will be handled by axios interceptor but we need to clear state
      get().logout();
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
