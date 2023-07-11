import React from 'react';

import Style from './FormEditUser.module.scss';

export default function FormEditUser() {
  return (
    <form className={Style.form}>
      <label>link foto</label>
      <input placeholder="ввидите ссылку на фотографию"></input>
      <label>name</label>
      <input placeholder="ввидите name"></input>
      <label>age</label>
      <input placeholder="ввидите your age"></input>
      <label>sity</label>
      <input placeholder="ввидите your sity"></input>
      <label>sity</label>
      <input placeholder="ввидите your email"></input>
      <button>edit</button>
    </form>
  );
}
