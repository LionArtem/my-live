import React, { useEffect, useState } from 'react';
import Style from './ListUsers.module.scss';
import { usersApi } from '../../../utils/UserApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redax/slices/authSlice';
import UserCard from '../../UserCard/UserCard';
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';
import Pagination from '../../Pagination/Pagination';
import ErrServer from '../../ErrServer/ErrServer';
import ButtonDelete from '../../Buttons/ButtonDelete/ButtonDelete';
import ModulConfirmation from '../../Moduls/ModulConfirmation/ModulConfirmation';

export default function ListUsers() {
  const { token } = useSelector(selectAuth);
  const [users, isUsers] = useState([]);
  const [numberPages, isNumberPages] = useState([]);
  const [showSceletonPage, isShowSceletonPage] = useState(true);
  const [errServer, isErrServer] = useState(false);
  const [textErr, isTextErr] = useState('');

  const getUsers = (page = localStorage.getItem('page') ?? 1) => {
    usersApi
      .getUsers(token, page)
      .then((res) => {
        isUsers(res.users);
        isNumberPages([...new Array(Math.ceil(res.numberUsers / 10))]);
      })
      .catch((err) => {
        isErrServer(true);
        isTextErr(err.message);
      })
      .finally(() => isShowSceletonPage(false));
  };

  useEffect(() => {
    getUsers();
    return () => localStorage.removeItem('page');
  }, []);

  const deleteUser = (id) => {
    usersApi
      .deleteUsers(token, id)
      .then((res) => {
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={Style.ListUsers}>
      <ButtonsNavigation page={'/admin'} text={'Назад'} />
      <ButtonsNavigation page={'/'} text={'На главную'} />
      {showSceletonPage ? (
        <h1>Загрузка...</h1>
      ) : errServer ? (
        <ErrServer textErr={textErr} />
      ) : (
        <ul className={Style.ListUsers_containerCard}>
          {users.map((user) => (
            <li key={user._id}>
              <UserCard
                user={user}
                showSceletonPage={showSceletonPage}
                errServer={errServer}
              />
              <ButtonDelete
                id={user._id}
                onClick={deleteUser}
                text={'Удалить профиль'}
              />
            </li>
          ))}
        </ul>
      )}
      {numberPages.length > 1 && (
        <Pagination getNumberPage={getUsers} numberPages={numberPages} />
      )}
      <ModulConfirmation text={'Удалить?'} />
    </div>
  );
}
