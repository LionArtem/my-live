import React from 'react';

import { useDispatch } from 'react-redux';
import { killAllStateAuth } from '../../redax/slices/authSlice';
import { killAllStateFormValidetion } from '../../redax/slices/formValidetionSlice';
import { killAllStateTopic } from '../../redax/slices/topicSlice';
import { killAllStateUser } from '../../redax/slices/userSlice';
import { killPaginationState } from '../../redax/slices/paginationSlice';

import Style from './AuthorizedUser.module.scss';
import { Link } from 'react-router-dom';

export default function AuthorizedUser() {
  const dispatch = useDispatch();

  return (
    <div className={Style.contener_auth}>
      <Link to={'my-page'}>
        <p className={Style.button_open}>Моя страница </p>
      </Link>
      <p
        className={Style.button_open}
        onClick={() => {
          localStorage.clear();
          dispatch(killAllStateAuth());
          dispatch(killAllStateFormValidetion());
          dispatch(killAllStateTopic());
          dispatch(killAllStateUser());
          dispatch(killPaginationState());
        }}
      >
        выйти
      </p>
    </div>
  );
}
