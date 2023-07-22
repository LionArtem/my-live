import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { auth } from '../../utils/Auth';

export const fetchAddUser = createAsyncThunk(
  'page/fetchAddUser',
  async (params, thunkAPI) => {
    const data = await auth.addUser(params.email, params.password);
    return data;
  }
);

export const fetchLoginUser = createAsyncThunk(
  'page/fetchLoginUser',
  async (params, thunkAPI) => {
    const data = await auth.loginUser(params.email, params.password);
    return data;
  }
);

const initialState = {
  fopmReg: false,
  fopmSign: false,
  auth: localStorage.getItem('token'),
  showPreloader: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    killAllStateAuth(state) {
      state.fopmReg = false;
      state.fopmSign = false;
      state.auth = '';
      state.showPreloader = false;
    },
    setfopmReg(state) {
      state.fopmReg = !state.fopmReg;
    },
    setFormSign(state) {
      state.fopmSign = !state.fopmSign;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddUser.pending, (state) => {
      state.showPreloader = true;
      console.log('запрос на регистрацию');
    });
    builder.addCase(fetchAddUser.fulfilled, (state, { payload }) => {
      // console.log(payload);
    });
    builder.addCase(fetchAddUser.rejected, (state) => {
      console.log('ошибка регистрации');
      state.showPreloader = false;
    });

    builder.addCase(fetchLoginUser.pending, (state) => {
      state.showPreloader = true;
      console.log('запрос на авторизацию');
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      state.auth = payload.token;
    });
    builder.addCase(fetchLoginUser.rejected, (state) => {
      state.showPreloader = false;
      console.log('ошибка авторизации');
    });
  },
});

export const selectAuth = (state) => state.auth;

export const { setfopmReg, setFormSign, killAllStateAuth } = authSlice.actions;
export default authSlice.reducer;
