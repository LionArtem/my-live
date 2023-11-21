import React from 'react';
import Stule from './PageAdmin.module.scss';
import { useNavigate } from 'react-router-dom';

export default function PageAdmin() {
  const navigate = useNavigate();
  return (
    <ul className={Stule.listContainer}>
      <li
        className={Stule.listContainer_title}
        onClick={() => navigate('/list-user')}
      >
        Список пользователей
      </li>
    </ul>
  );
}
