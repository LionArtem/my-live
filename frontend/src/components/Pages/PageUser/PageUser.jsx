import React, { useEffect, useState } from 'react';
import Style from './PageUser.module.scss';
import { usersApi } from '../../../utils/UserApi';
import ErrServer from '../../ErrServer/ErrServer';

export default function PageUser() {
  const [user, isUser] = useState();
  const [err, isErr] = useState(false);
  const [errText, isErrText] = useState('');

  useEffect(() => {
    usersApi
      .getUserId(localStorage.getItem('userId'))
      .then((user) => {
        isUser(user);
      })
      .catch((err) => {
        isErr(true);
        isErrText(err.message);
      });
  }, []);

  if (err) {
    return <ErrServer textErr={errText} />;
  }

  if (!user) {
    return;
  }

  return (
    <div className={Style.PageUser}>
      <img
        className={Style.foto}
        src={
          user.avatar
            ? `http://localhost:3001/${user.avatar}`
            : 'https://www.murrayglass.com/wp-content/uploads/2020/10/avatar-scaled.jpeg'
        }
        alt="аватарка"
      />
      <p>{user.name}</p>
      <p>{`(${user.gender}. ${user.age})`}</p>
      <p>{user.town}</p>
    </div>
  );
}
