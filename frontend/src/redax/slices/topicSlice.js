import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { topicApi } from '../../utils/TopicApi';

export const fetchTopicAll = createAsyncThunk(
  'page/fetchTopicAll',
  async (params, thunkAPI) => {
    const data = await topicApi.getAllTopics();
    return data.reverse();
  }
);

const initialState = {

  topicsAll: [],
};

const topicsSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopicAll.pending, (state) => {
      console.log('загрузка всех topics');
    });
    builder.addCase(fetchTopicAll.fulfilled, (state, { payload }) => {
      state.topicsAll = payload;
    });
    builder.addCase(fetchTopicAll.rejected, (state) => {
      console.log('ошибка загрузки все topics');
    });
  },
});

export const selectTopics = (state) => state.topics;
export default topicsSlice.reducer;
