import React, { useEffect } from 'react';
import Style from './PageUser.module.scss';
import { usersApi } from '../../../utils/UserApi';

export default function PageUser() {
  useEffect(() => {
    usersApi
      .getUserId(localStorage.getItem('userId'))
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>PageUser</div>;
}
