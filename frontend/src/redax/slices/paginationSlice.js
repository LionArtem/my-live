import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../utils/Api';

import { setMessagePage } from '../slices/messageSlice';

export const fetchPaginationPage = createAsyncThunk(
  'page/fetchPaginationPage',
  async (params, thunkAPI) => {
    const data = await api.getPaginationPage(params);
    thunkAPI.dispatch(setMessagePage(data));
    return data;
  }
);

const initialState = {
  pageNumber: 1,
  numberOfAllPages: 1,
  isAddPage: true,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setIsAddPage(state, action) {
      state.isAddPage = action.payload;
    },
    setNumberOfAllPages(state, action) {
      if (action.payload.length % 10 === 0) {
        state.numberOfAllPages = action.payload.length / 10 + 1;
        return;
      }
      state.numberOfAllPages = Math.ceil(action.payload.length / 10);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPaginationPage.pending, (state) => {
      console.log('загрузка пагинации');
      state.isAddPage = true;
    });
    builder.addCase(fetchPaginationPage.fulfilled, (state, { payload }) => {
      state.isAddPage = false;
      state.messageAll = payload;
    });
    builder.addCase(fetchPaginationPage.rejected, (state) => {
      state.isAddPage = 'error';
      console.log('ошибка загрузки пагинации');
    });
  },
});

export const selectPagination = (state) => state.pagination;

export const { setPageNumber, setNumberOfAllPages, setIsAddPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
