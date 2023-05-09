import React from 'react';

import Style from './Header.module.scss';

export default function Header() {
  return (
    <>
      <h1 >My Live</h1>
      <div className={Style.root}>
        <p>Регистрация</p>
        <p>Войти</p>
      </div>
    </>
  );
}
