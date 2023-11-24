import React from 'react';
import Style from './MyPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetUser,
  killAllStateUser,
  selectUser,
} from '../../../redax/slices/userSlice';
import { selectAuth } from '../../../redax/slices/authSlice';
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';
import UserCard from '../../UserCard/UserCard';

export default function MyPage() {
  const dispatch = useDispatch();
  const { user, showSceletonPage, errServer } = useSelector(selectUser);
  const { token } = useSelector(selectAuth);
  console.log(user);

  React.useEffect(() => {
    dispatch(fetchGetUser(token));
  }, []);

  React.useEffect(() => {
    return () => dispatch(killAllStateUser());
  }, []);

  return (
    <div className={Style.use_conteiner}>
      <ButtonsNavigation page={'/'} text={'Назад'} />
      <div className={Style.use_card}>
        <img
          className={Style.foto}
          src={
            user.avatar
              ? `http://localhost:3001/${user.avatar}`
              : 'https://www.murrayglass.com/wp-content/uploads/2020/10/avatar-scaled.jpeg'
          }
          alt="аватарка"
        />
        <p>{`Имя: ${user.name}`}</p>
        <p>{`Город: ${user.town}`}</p>
        <p>{`Возраст: ${user.age}`}</p>
        <p>{`Пол: ${user.gender}`}</p>
        <ButtonsNavigation page={'/edit-user'} text={'Редактировать профиль'} />
      </div>
    </div>
  );
}
