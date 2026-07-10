import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookmarkedPersona {
  id: string;
  title: string;
  sub: string;
  image: string;
  type: 'public' | 'personal';
}

interface BookmarksState {
  bookmarks: BookmarkedPersona[];
}

const initialState: BookmarksState = {
  bookmarks: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<BookmarkedPersona>) {
      if (!state.bookmarks.find((b) => b.id === action.payload.id)) {
        state.bookmarks.push(action.payload);
      }
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
