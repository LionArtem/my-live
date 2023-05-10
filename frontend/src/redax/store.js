import { configureStore } from '@reduxjs/toolkit';
import message from './slices/messageSlice';
import pagination from './slices/paginationSlice';
import topics from './slices/topicSlice';
import auth from './slices/authSlice';

export const store = configureStore({
  reducer: { message, pagination, topics, auth },
});
