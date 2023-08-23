import React from 'react';
import Style from './MyPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetUser,
  selectUser,
  killAllStateUser,
} from '../../redax/slices/userSlice';
import { selectAuth } from '../../redax/slices/authSlice';
import MyPagePreloader from './MyPagePreloader';
import ButtonsNavigation from '../Buttons/ButtonsNavigation/ButtonsNavigation';
import ErrServer from '../ErrServer/ErrServer';

export default function MyPage() {
  const dispatch = useDispatch();

  const { user, showSceletonPage, errServer } =
    useSelector(selectUser);
  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    dispatch(fetchGetUser(token));
  }, []);

  React.useEffect(() => {
    return () => dispatch(killAllStateUser());
  }, []);

  return (
    <div className={Style.root}>
      <div className={Style.use_conteiner}>
        <div className={Style.info_user}>
          {showSceletonPage ? (
            <MyPagePreloader />
          ) : errServer ? (
            <ErrServer textErr="На сервере произошла ошибка, попробуйте зайти позже." />
          ) : (
            <>
              {' '}
              <img className={Style.foto} src={user.avatar} alt="аватарка" />
              <h3>{user.name}</h3>
              <p>{`(${user.gender})${user.age}`}</p>
              <p>{user.sity}</p>
              <p>{user.email}</p>
              <ButtonsNavigation
                page={'/edit-user'}
                text={'Редактировать профиль'}
              />
            </>
          )}
        </div>
        <ButtonsNavigation page={'/'} text={'Назад'} />
      </div>
    </div>
  );
}
