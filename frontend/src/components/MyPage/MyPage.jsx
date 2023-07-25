import React from 'react';
import Style from './MyPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUser, selectUser } from '../../redax/slices/userSlice';
import { selectAuth } from '../../redax/slices/authSlice';
import { Link } from 'react-router-dom';
import MyPagePreloader from './MyPagePreloader';

export default function MyPage() {
  const dispatch = useDispatch();
  const { user, showPreloaderMyPage } = useSelector(selectUser);
  const { auth } = useSelector(selectAuth);

  React.useEffect(() => {
    dispatch(fetchGetUser(auth));
  }, []);

  return (
    <div className={Style.root}>
      <div className={Style.useConteiner}>
        {showPreloaderMyPage ? (
          <MyPagePreloader />
        ) : (
          <div className={Style.infoUser}>
            <img className={Style.foto} src={user.avatar} alt="аватарка" />
            <h3>{user.name}</h3>
            <p>{`(${user.gender})${user.age}`}</p>
            <p>{user.sity}</p>
            <p>{user.email}</p>
            <Link to="/edit-user">
              <p className={Style.button}>Редактировать профиль</p>
            </Link>
          </div>
        )}
        <Link to="/">
          <p className={Style.button}>Назад</p>
        </Link>
      </div>
    </div>
  );
}
