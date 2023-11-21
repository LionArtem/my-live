import React, { useEffect, useState } from 'react';
import Stule from './ListUsers.module.scss';
import { usersApi } from '../../../utils/UserApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redax/slices/authSlice';
import UserCard from '../../UserCard/UserCard';

export default function ListUsers() {
  const { token } = useSelector(selectAuth);
  const [users, isUsers] = useState([]);
  const [showSceletonPage, isShowSceletonPage] = useState(true);
  const [errServer, isErrServer] = useState(false);

  useEffect(() => {
    usersApi
      .getUsers(token)
      .then((res) => {
        console.log(res);
        isUsers(res);
      })
      .catch((err) => {
        console.log(err);
        isErrServer(true);
      })
      .finally(() => isShowSceletonPage(false));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <UserCard
            user={user}
            showSceletonPage={showSceletonPage}
            errServer={errServer}
          />
        </li>
      ))}
    </ul>
  );
}
