import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { topicApi } from '../../utils/TopicApi';

export const fetchTopicAll = createAsyncThunk(
  'page/fetchTopicAll',
  async (params, thunkAPI) => {
    const data = await topicApi.getAllTopics();
    return data.reverse();
  }
);

export const fetchGetTopic = createAsyncThunk(
  'page/fetchGetTopic',
  async (params, thunkAPI) => {
    // console.log(thunkAPI.getState().topics.authorTopic._id);
    // const id = thunkAPI.getState().topics.authorTopic._id
    const data = await topicApi.getPost(params.id);
    return data;
  }
);

const initialState = {
  authorTopic: {},
  topicsAll: [],
};

const topicsSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    addAuthorTopic(state, action) {
      state.authorTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopicAll.pending, (state) => {
      console.log('загрузка всех topics');
    });
    builder.addCase(fetchTopicAll.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.topicsAll = payload;
    });
    builder.addCase(fetchTopicAll.rejected, (state) => {
      console.log('ошибка загрузки все topics');
    });

    builder.addCase(fetchGetTopic.pending, (state) => {
      console.log('загрузка topic');
    });
    builder.addCase(fetchGetTopic.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.authorTopic = { title: payload.title, name: payload.owner.name };
    });
    builder.addCase(fetchGetTopic.rejected, (state) => {
      console.log('ошибка загрузки topic');
    });
  },
});

export const selectTopics = (state) => state.topics;
export const { addAuthorTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
