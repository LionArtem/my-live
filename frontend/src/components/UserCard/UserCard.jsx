import React from 'react';
import Style from './UserCard.module.scss';

export default function UserCard({ user }) {
  return (
    <div className={Style.info_user}>
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
    </div>
  );
}
