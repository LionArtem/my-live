import React from 'react';

import { useDispatch } from 'react-redux';
import { setAuth } from '../../redax/slices/authSlice';

import Style from './AuthorizedUser.module.scss';
import { Link } from 'react-router-dom';

export default function AuthorizedUser() {

  const dispatch = useDispatch();
  
  return (
    <div className={Style.contenerAuth}>
      <Link to={'my-page'}>
        <p className={Style.buttonOpen}>Моя страница </p>
      </Link>
      <p
        className={Style.buttonOpen}
        onClick={() => {
          console.log('удалить токен');
          localStorage.clear();
          dispatch(setAuth());
        }}
      >
        выйти
      </p>
    </div>
  );
}
