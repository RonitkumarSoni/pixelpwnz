import axios from 'axios';
import { store } from '../store';

// For Android emulator use 10.0.2.2, for physical device use your machine's IP
const getBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  // Android emulator uses 10.0.2.2 to reach the host machine
  return 'http://10.0.2.2:5000/api';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
});

// Request interceptor: attach session_id header
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const sessionId = state.session.sessionId;
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle session expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404 && error.response?.data?.message?.includes('Session not found')) {
      // Session expired on server, we could dispatch clearSession here
      console.warn('[API] Session expired on server.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
