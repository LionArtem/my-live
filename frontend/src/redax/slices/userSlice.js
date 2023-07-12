import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { usercApi } from '../../utils/UserApi';

export const fetchGetUser = createAsyncThunk(
  'page/fetchGetUser',
  async (params, thunkAPI) => {
    const data = await usercApi.getUserMe();
    return data;
  }
);

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetUser.pending, (state) => {
      console.log('запрос на получение пользователя');
    });
    builder.addCase(fetchGetUser.fulfilled, (state, { payload }) => {
      //console.log(payload);
      state.user = payload;
    });
    builder.addCase(fetchGetUser.rejected, (state) => {
      console.log('ошибка запроса на получение пользователя');
    });
  },
});

export const selectUser = (state) => state.user;

export const {} = userSlice.actions;
export default userSlice.reducer;
