import { configureStore } from '@reduxjs/toolkit';
import topics from './slices/topicSlice';
import auth from './slices/authSlice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: { topics, auth, user },
});
