import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuth,
  setfopmReg,
  setFormSign,
} from '../../redax/slices/authSlice';

import Style from './Authorization.module.scss';
import FormAuth from '../FormAuth/FormAuth';

export default function Authorization() {

  
  const dispatch = useDispatch();
  const { fopmReg, fopmSign } = useSelector(selectAuth);
  return (
    <div className={Style.contenerAuth}>
      <p className={Style.buttonOpen} onClick={() => dispatch(setfopmReg())}>
        Регистрация
      </p>
      <p className={Style.buttonOpen} onClick={() => dispatch(setFormSign())}>
        Войти
      </p>
      {fopmReg && (
        <FormAuth text="Pегистрация" textButton="зарегистрироваться" />
      )}
      {fopmSign && <FormAuth text="Авторизация" textButton="войти" />}
    </div>
  );
}
