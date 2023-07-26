import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { topicApi } from '../../utils/TopicApi';

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

export const fetchGetTopicPaginetion = createAsyncThunk(
  'page/fetchGetTopicPaginetion',
  async (params, thunkAPI) => {
    const data = await topicApi.getTopicPaginetion(params);
    return data;
  }
);

export const fetchAddTopic = createAsyncThunk(
  'page/fetchAddTopic',
  async (params, thunkAPI) => {
    const data = await topicApi.addNewTopic(params);
    return data;
  }
);

const initialState = {
  messageValue: '',
  authorTopic: {},
  titleTopic: '',
  topicsInPage: [],
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
          ...new Array(
            Math.ceil(
              payload.numberMessages % 10 === 0
                ? payload.numberMessages / 10 + 1
                : payload.numberMessages / 10
            )
          ),
        ];
      }
    );
    builder.addCase(fetchGetMessagePaginetion.rejected, (state, action) => {
      console.log('ошибка загрузки paginetion message');
    });

    builder.addCase(fetchGetTopicPaginetion.pending, (state) => {
      console.log('загрузка paginetion topics');
    });
    builder.addCase(fetchGetTopicPaginetion.fulfilled, (state, { payload }) => {
      state.topicsInPage = payload.topic;
      state.numberPages = [...new Array(Math.ceil(payload.numberTopics / 10))];
    });
    builder.addCase(fetchGetTopicPaginetion.rejected, (state, action) => {
      console.log('ошибка загрузки paginetion topic');
    });

    builder.addCase(fetchAddTopic.pending, (state) => {
      console.log('создание темы');
    });
    builder.addCase(fetchAddTopic.fulfilled, (state, { payload }) => {
      // console.log(payload);
    });
    builder.addCase(fetchAddTopic.rejected, (state, action) => {
      console.log(action);
      console.log('ошибка создания темы');
    });
  },
});

export const selectTopics = (state) => state.topics;
export const { addAuthorTopic, setMessageValue, killAllStateTopic } =
  topicsSlice.actions;
export default topicsSlice.reducer;
