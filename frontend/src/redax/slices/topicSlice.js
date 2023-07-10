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
    const data = await topicApi.getTopic(params.id);
    return data;
  }
);

export const fetchAddMessageInTopic = createAsyncThunk(
  'page/fetchAddMessageInTopic',
  async (params, thunkAPI) => {
    const data = await topicApi.addMessageInTopic(
      params.id,
      params.message,
      params.author
    );
    return data;
  }
);

const initialState = {
  messageValue: '',
  authorTopic: {},
  topicsAll: [],
  topicMessage: [],
};

const topicsSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setMessageValue(state, action) {
      state.messageValue = action.payload;
    },
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

    builder.addCase(fetchGetTopic.pending, (state) => {
      console.log('загрузка topic');
    });
    builder.addCase(fetchGetTopic.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.authorTopic = { title: payload.title, name: payload.owner.name };
      state.topicMessage = payload.messages;
    });
    builder.addCase(fetchGetTopic.rejected, (state) => {
      console.log('ошибка загрузки message');
    });

    builder.addCase(fetchAddMessageInTopic.pending, (state) => {
      console.log('загрузка message');
    });
    builder.addCase(fetchAddMessageInTopic.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.topicMessage = payload.messages;
    });
    builder.addCase(fetchAddMessageInTopic.rejected, (state) => {
      console.log('ошибка загрузки message');
    });
  },
});

export const selectTopics = (state) => state.topics;
export const { addAuthorTopic, setMessageValue } = topicsSlice.actions;
export default topicsSlice.reducer;
