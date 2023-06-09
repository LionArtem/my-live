import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  errors: {},
  valid: false,
};

const formValidetionSlice = createSlice({
  name: 'formValidetion',
  initialState,
  reducers: {
    killAllStateFormValidetion(state) {
      state.value = {};
      state.errors = {};
      state.valid = false;
    },
    defaultValues(state, action) {
      state.value = {
        name: action.payload.name,
        email: action.payload.email,
        age: action.payload.age,
        avatar: action.payload.avatar,
        sity: action.payload.sity,
      };
    },
    setValue(state, action) {
      const { value, name, errors, valid } = action.payload;
      state.value = { ...state.value, [name]: value };
      state.errors = { ...state.errors, [name]: errors };
      state.valid = valid;
    },
    resetValues(state) {
      state.value = {};
    },
    setValid(state) {
      state.valid = false;
    },
  },
});

export const selectformValidetion = (state) => state.formValidetion;

export const {
  setValue,
  resetValues,
  setValid,
  defaultValues,
  killAllStateFormValidetion,
} = formValidetionSlice.actions;
export default formValidetionSlice.reducer;
