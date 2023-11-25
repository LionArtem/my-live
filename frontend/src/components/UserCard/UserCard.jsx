import React from 'react';
import Style from './UserCard.module.scss';
// import { useSelector } from 'react-redux';
import MyPagePreloader from './MyPagePreloader';
import ErrServer from '../ErrServer/ErrServer';
// import { selectUser } from '../../redax/slices/userSlice';

export default function UserCard({ user, showSceletonPage, errServer }) {
  return (
    <div className={Style.info_user}>
      {showSceletonPage ? (
        <MyPagePreloader />
      ) : errServer ? (
        <ErrServer textErr="На сервере произошла ошибка, попробуйте зайти позже." />
      ) : (
        <>
          {' '}
          <img
            className={Style.foto}
            src={
              user.avatar
                ? `http://localhost:3001/${user.avatar}`
                : 'https://www.murrayglass.com/wp-content/uploads/2020/10/avatar-scaled.jpeg'
            }
            alt="аватарка"
          />
          <h3 className={Style.name}>{user.name}</h3>
          <p>{`(${user.gender})${user.age}`}</p>
          <p>{user.sity}</p>
          <p className={Style.email}>{user.email}</p>
        </>
      )}
    </div>
  );
}
