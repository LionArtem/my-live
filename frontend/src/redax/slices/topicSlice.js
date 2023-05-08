import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { topicApi } from '../../utils/TopicApi';

export const fetchTopicAll = createAsyncThunk(
  'page/fetchMessageAll',
  async (params, thunkAPI) => {
    const data = await topicApi.getAllTopics();
    return data;
  }
);

const initialState = {
//   messageValue: '',
//   messagePage: [],
  topicsAll: [],
};

const topicsSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    // setMessageValue(state, action) {
    //   state.messageValue = action.payload;
    // },
    // setMessagePage(state, action) {
    //   state.messagePage = action.payload;
    // },
    // addNewMessageState(state, action) {
    //   state.messagePage.push(action.payload);
    // },
    // setMessageAll(state, action) {
    //   state.messageAll = action.payload;
    // },
    // addNewMessageAll(state, action) {
    //   state.messageAll.push(action.payload);
    // },
    // deleteOneMessageAll(state) {
    //   state.messageAll.shift();
    // },
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

// export const {
//   setMessageValue,
//   setMessagePage,
//   addNewMessageState,
//   setMessageAll,
//   addNewMessageAll,
//   deleteOneMessageAll,
// } = topicsSlice.actions;
export default topicsSlice.reducer;
