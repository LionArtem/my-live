import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setNumberOfAllPages } from '../slices/paginationSlice';

import { api } from '../../utils/Api';

export const fetchMessageAll = createAsyncThunk(
  'page/fetchMessageAll',
  async (params, thunkAPI) => {
    const data = await api.getAllMessage();
    thunkAPI.dispatch(setNumberOfAllPages(data));
    return data;
  }
);

const initialState = {
  messageValue: '',
  messagePage: [],
  messageAll: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessageValue(state, action) {
      state.messageValue = action.payload;
    },
    setMessagePage(state, action) {
      state.messagePage = action.payload;
    },
    addNewMessageState(state, action) {
      state.messagePage.push(action.payload);
    },
    setMessageAll(state, action) {
      state.messageAll = action.payload;
    },
    addNewMessageAll(state, action) {
      state.messageAll.push(action.payload);
    },
    deleteOneMessageAll(state) {
      state.messageAll.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessageAll.pending, (state) => {
      console.log('загрузка всех сообщений');
    });
    builder.addCase(fetchMessageAll.fulfilled, (state, { payload }) => {
      state.messageAll = payload;
    });
    builder.addCase(fetchMessageAll.rejected, (state) => {
      console.log('ошибка загрузки все сообщений');
    });
  },
});

export const selectMessage = (state) => state.message;

export const {
  setMessageValue,
  setMessagePage,
  addNewMessageState,
  setMessageAll,
  addNewMessageAll,
  deleteOneMessageAll,
} = messageSlice.actions;
export default messageSlice.reducer;
