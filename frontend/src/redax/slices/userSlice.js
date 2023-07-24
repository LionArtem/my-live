import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { usersApi } from '../../utils/UserApi';

export const fetchGetUser = createAsyncThunk(
  'page/fetchGetUser',
  async (params, thunkAPI) => {
    const data = await usersApi.getUserMe(params);
    return data;
  }
);

export const fetchPatchUser = createAsyncThunk(
  'page/fetchPatchUser',
  async (params, thunkAPI) => {
    const { age, avatar, email, name, sity, gender } =
      thunkAPI.getState().formValidetion.value;
    const data = await usersApi.patchUserMe(
      age,
      avatar,
      email,
      name,
      sity,
      gender
    );
    return data;
  }
);

export const fetchGetUserId = createAsyncThunk(
  'page/fetchGetUserId',
  async (params, thunkAPI) => {
    const data = await usersApi.getUserId(params.id);
    return data;
  }
);

export const fetchGetUserFindId = createAsyncThunk(
  'page/fetchGetUserFindId',
  async (params, thunkAPI) => {
    const data = await usersApi.getUserFindId(params.arrIdUser);
    return { data, topic: params.messages };
  }
);

const initialState = {
  user: {},
  allMessagesAndAuthors: [],
  showPreloader: false,
  textSuccess: '',
  textErr: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTextSuccess(state, action) {
      state.textSuccess = action.payload;
    },
    killAllStateUser(state) {
      state.user = {};
      state.allMessagesAndAuthors = [];
      state.showPreloader = false;
      state.textSuccess = '';
    },
  },
  extraReducers: (builder) => {
    // запрос на получение текущего пользователя
    builder.addCase(fetchGetUser.pending, (state) => {
      console.log('запрос на получение пользователя');
    });
    builder.addCase(fetchGetUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      localStorage.setItem('userId', payload._id);
    });
    builder.addCase(fetchGetUser.rejected, (state) => {
      console.log('ошибка запроса на получение пользователя');
    });

    // запрос на редактирование пользователя
    builder.addCase(fetchPatchUser.pending, (state) => {
      console.log('запрос на редактирования пользователя');
      state.showPreloader = true;
    });
    builder.addCase(fetchPatchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      localStorage.setItem('userId', payload._id);
      state.showPreloader = false;
    });
    builder.addCase(fetchPatchUser.rejected, (state, payload) => {
      console.log('ошибка запроса на редактирование пользователя');
      console.log(payload);
      state.showPreloader = false;
      state.textErr = 'на сервере произошла ошибка';
    });

    // запрос на получение пользователя по id
    builder.addCase(fetchGetUserId.pending, (state) => {
      console.log('запрос на получение пользователя по id');
    });
    builder.addCase(fetchGetUserId.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchGetUserId.rejected, (state) => {
      console.log('ошибка запроса получение пользователя по id');
    });

    // запрос на получение пользователя по массиву id
    builder.addCase(fetchGetUserFindId.pending, (state) => {
      console.log('запрос на получение пользователя по массиву id');
    });
    builder.addCase(fetchGetUserFindId.fulfilled, (state, { payload }) => {
      state.allMessagesAndAuthors = payload.topic.messages.map((messages) => {
        return {
          messages,
          user: payload.data.find((userInfo) => {
            if (userInfo) {
              return userInfo._id === messages.userId;
            }
            return null;
          }),
        };
      });
    });
    builder.addCase(fetchGetUserFindId.rejected, (state, action) => {
      console.log(action);
      console.log('ошибка запроса получение пользователя по массиву id');
    });
  },
});

export const selectUser = (state) => state.user;

export const { killAllStateUser, addTextSuccess } = userSlice.actions;
export default userSlice.reducer;
