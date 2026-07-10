import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  sessionId: string | null;
  userName: string | null;
  avatarUrl?: string | null;
  pairCount: number;
  isUploading: boolean;
  uploadProgress: number; // 0 to 1
  hasAgreedToPrivacy: boolean;
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  sessionId: null,
  userName: null,
  avatarUrl: null,
  pairCount: 0,
  isUploading: false,
  uploadProgress: 0,
  hasAgreedToPrivacy: false,
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ sessionId: string; userName: string; pairCount: number; avatarUrl?: string }>) {
      state.sessionId = action.payload.sessionId;
      state.userName = action.payload.userName;
      state.avatarUrl = action.payload.avatarUrl || null;
      state.pairCount = action.payload.pairCount;
    },
    setUploading(state, action: PayloadAction<boolean>) {
      state.isUploading = action.payload;
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    agreeToPrivacy(state) {
      state.hasAgreedToPrivacy = true;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    clearSession(state) {
      state.sessionId = null;
      state.userName = null;
      state.avatarUrl = null;
      state.pairCount = 0;
      state.isUploading = false;
      state.uploadProgress = 0;
      // Note: privacy agreement persists
      state.isLoggedIn = false;
    },
  },
});

export const { setSession, setUploading, setUploadProgress, agreeToPrivacy, setIsLoggedIn, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
