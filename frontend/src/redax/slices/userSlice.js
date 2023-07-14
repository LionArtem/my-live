import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { usercApi } from '../../utils/UserApi';

export const fetchGetUser = createAsyncThunk(
  'page/fetchGetUser',
  async (params, thunkAPI) => {
    const data = await usercApi.getUserMe();
    return data;
  }
);

export const fetchPatchUser = createAsyncThunk(
  'page/fetchPatchUser',
  async (params, thunkAPI) => {
    const { age, avatar, email, name, sity } =
      thunkAPI.getState().formValidetion.value;
    const data = await usercApi.patchUserMe(age, avatar, email, name, sity);
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
      localStorage.setItem('user', JSON.stringify(payload));
    });
    builder.addCase(fetchGetUser.rejected, (state) => {
      console.log('ошибка запроса на получение пользователя');
    });

    builder.addCase(fetchPatchUser.pending, (state) => {
      console.log('запрос на редактирования пользователя');
    });
    builder.addCase(fetchPatchUser.fulfilled, (state, { payload }) => {
      //console.log(payload);
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    });
    builder.addCase(fetchPatchUser.rejected, (state) => {
      console.log('ошибка запроса на редактирование пользователя');
    });
  },
});

export const selectUser = (state) => state.user;

export const {} = userSlice.actions;
export default userSlice.reducer;
