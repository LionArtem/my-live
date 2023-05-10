import React from 'react';

import { useDispatch } from 'react-redux';
import { setAuth } from '../../redax/slices/authSlice';

import Style from './AuthorizedUser.module.scss';
export default function AuthorizedUser() {
  const dispatch = useDispatch();
  return (
    <div className={Style.contenerAuth}>
      <p className={Style.buttonOpen}>Моя страница </p>
      <p
        className={Style.buttonOpen}
        onClick={() => {
          console.log('удалить токен');
          localStorage.removeItem('token');
          dispatch(setAuth());
        }}
      >
        выйти
      </p>
    </div>
  );
}
