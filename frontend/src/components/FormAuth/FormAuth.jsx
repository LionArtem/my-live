import React from 'react';
import style from './FormAuth.module.scss';
import { auth } from '../../utils/Auth';

export default function FormAuth({ isForm, textButton, text }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === 'Pегистрация') {
      auth
        .addUser(e.target.email.value, e.target.password.value, 'signup')
        .then((user) => console.log(user))
        .catch((err) => console.log(err));
    } else {
      auth
        .addUser(e.target.email.value, e.target.password.value, 'signin')
        .then((user) => {
          console.log(user);
          localStorage.setItem('token', user.token);
        })
        .catch((err) => console.log(err));
    }
    isForm(false);
  };

  return (
    <div className={style.overflow}>
      <div className={style.form_contener}>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
          <div onClick={() => isForm(false)} className={style.buttoncloseform}>
            закрыть
          </div>
          <p className={style.title}>{text}</p>
          <input type="email" name="email" placeholder="email"></input>
          <input type="password" name="password" placeholder="пароль"></input>
          <button type="submit" className={style.button}>
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
