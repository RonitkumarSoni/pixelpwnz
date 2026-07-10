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
    const state = store.getState() as any;
    
    // Attach Session ID
    const sessionId = state.session?.sessionId;
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }
    
    // Attach JWT Token
    const token = state.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle session expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('[API] Unauthorized. Please log in again.');
      // Typically, you'd dispatch a logout action here.
      // store.dispatch({ type: 'auth/logout' });
    } else if (error.response?.status === 404 && error.response?.data?.message?.includes('Session not found')) {
      console.warn('[API] Session expired on server.');
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const registerUser = async (email: string, password: string, name: string) => {
  const response = await apiClient.post('/auth/register', { email, password, name });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export default apiClient;
