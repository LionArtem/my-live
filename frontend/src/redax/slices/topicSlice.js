import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { topicApi } from '../../utils/TopicApi';

export const fetchTopicAll = createAsyncThunk(
  'page/fetchTopicAll',
  async (params, thunkAPI) => {
    const data = await topicApi.getAllTopics();
    return data.reverse();
  }
);

export const fetchAddMessageInTopic = createAsyncThunk(
  'page/fetchAddMessageInTopic',
  async (params, thunkAPI) => {
    const data = await topicApi.addMessageInTopic(params);
    return data;
  }
);

export const fetchGetMessagePaginetion = createAsyncThunk(
  'page/fetchGetMessagePaginetion',
  async (params, thunkAPI) => {
    const data = await topicApi.getMessagePaginetion(params);
    return data;
  }
);

const initialState = {
  messageValue: '',
  authorTopic: {},
  titleTopic: '',
  topicsAll: [],
  numberPages: [],
};

const topicsSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    killAllStateTopic(state) {
      state.messageValue = '';
      state.authorTopic = {};
      state.titleTopic = '';
      state.topicsAll = [];
      state.numberPages = [];
    },
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

    builder.addCase(fetchAddMessageInTopic.pending, (state) => {
      console.log('загрузка message');
    });
    builder.addCase(
      fetchAddMessageInTopic.fulfilled,
      (state, { payload }) => {}
    );
    builder.addCase(fetchAddMessageInTopic.rejected, (state, action) => {
      console.log('ошибка загрузки message');
    });

    builder.addCase(fetchGetMessagePaginetion.pending, (state) => {
      console.log('загрузка paginetion message');
    });
    builder.addCase(
      fetchGetMessagePaginetion.fulfilled,
      (state, { payload }) => {
        state.titleTopic = payload.title;
        state.authorTopic = payload.user;
        state.numberPages = [
          ...new Array(Math.ceil(payload.numberMessages / 10)),
        ];
      }
    );
    builder.addCase(fetchGetMessagePaginetion.rejected, (state, action) => {
      console.log('ошибка загрузки paginetion message');
    });
  },
});

export const selectTopics = (state) => state.topics;
export const { addAuthorTopic, setMessageValue, killAllStateTopic } =
  topicsSlice.actions;
export default topicsSlice.reducer;
