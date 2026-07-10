import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'clone';
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  isThinking: boolean; // AI is generating a response
}

const initialState: ChatState = {
  messages: [],
  isThinking: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setThinking(state, action: PayloadAction<boolean>) {
      state.isThinking = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
      state.isThinking = false;
    },
  },
});

export const { addMessage, setThinking, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
