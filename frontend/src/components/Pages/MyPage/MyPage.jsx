import React from 'react';
import Style from './MyPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetUser,
  killAllStateUser,
} from '../../../redax/slices/userSlice';
import { selectAuth } from '../../../redax/slices/authSlice';
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';
import UserCard from '../../UserCard/UserCard';

export default function MyPage() {
  const dispatch = useDispatch();

  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    dispatch(fetchGetUser(token));
  }, []);

  React.useEffect(() => {
    return () => dispatch(killAllStateUser());
  }, []);

  return (
    <div className={Style.use_conteiner}>
      <UserCard />
      <ButtonsNavigation page={'/edit-user'} text={'Редактировать профиль'} />
      <ButtonsNavigation page={'/'} text={'Назад'} />
    </div>
  );
}
