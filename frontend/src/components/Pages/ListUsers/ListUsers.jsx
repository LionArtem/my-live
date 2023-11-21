import React, { useEffect } from 'react';
import Stule from './ListUsers.module.scss';
import { usersApi } from '../../../utils/UserApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redax/slices/authSlice';

export default function ListUsers() {
  const { token } = useSelector(selectAuth);

  useEffect(() => {
    usersApi
      .getUsers(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>ListUsers</div>;
}
