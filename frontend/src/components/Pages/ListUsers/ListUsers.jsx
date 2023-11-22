import React, { useEffect, useState } from 'react';
import Stule from './ListUsers.module.scss';
import { usersApi } from '../../../utils/UserApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redax/slices/authSlice';
import UserCard from '../../UserCard/UserCard';
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';
import Pagination from '../../Pagination/Pagination';

export default function ListUsers() {
  const { token } = useSelector(selectAuth);
  const [users, isUsers] = useState([]);
  const [numberPages, isNumberPages] = useState([]);
  const [showSceletonPage, isShowSceletonPage] = useState(true);
  const [errServer, isErrServer] = useState(false);

  const getUsers = (page = localStorage.getItem('page') ?? 1) => {
    usersApi
      .getUsers(token, page)
      .then((res) => {
        isUsers(res.users);
        isNumberPages([...new Array(Math.ceil(res.numberUsers / 10))]);
      })
      .catch((err) => {
        console.log(err);
        isErrServer(true);
      })
      .finally(() => isShowSceletonPage(false));
  };

  useEffect(() => {
    getUsers();
    return () => localStorage.removeItem('page');
  }, []);

  return (
    <div>
      <ButtonsNavigation page={'/admin'} text={'Назад'} />
      <ButtonsNavigation page={'/'} text={'На главную'} />
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
      {numberPages.length > 1 && (
        <Pagination getNumberPage={getUsers} numberPages={numberPages} />
      )}
    </div>
  );
}
