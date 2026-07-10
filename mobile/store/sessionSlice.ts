import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  sessionId: string | null;
  userName: string | null;
  avatarUrl?: string | null;
  personaName: string | null;
  personaAvatar: string | null;
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
  personaName: null,
  personaAvatar: null,
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
    setSession(state, action: PayloadAction<{ sessionId: string; userName?: string; avatarUrl?: string; personaName?: string; pairCount: number; personaAvatar?: string }>) {
      state.sessionId = action.payload.sessionId;
      if (action.payload.userName) state.userName = action.payload.userName;
      if (action.payload.avatarUrl) state.avatarUrl = action.payload.avatarUrl;
      state.personaName = action.payload.personaName || null;
      state.personaAvatar = action.payload.personaAvatar || null;
      state.pairCount = action.payload.pairCount;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setAvatarUrl(state, action: PayloadAction<string | null>) {
      state.avatarUrl = action.payload;
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
      state.personaName = null;
      state.personaAvatar = null;
      state.pairCount = 0;
      state.isUploading = false;
      state.uploadProgress = 0;
      // Note: privacy agreement persists
      state.isLoggedIn = false;
      state.userName = null;
      state.avatarUrl = null;
    },
  },
});

export const { setSession, setUserName, setAvatarUrl, setUploading, setUploadProgress, agreeToPrivacy, setIsLoggedIn, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
