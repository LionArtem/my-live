import React from 'react';

import { useDispatch } from 'react-redux';
import {
  fetchAddUser,
  fetchLoginUser,
  setfopmReg,
  setFormSign,
} from '../../redax/slices/authSlice';

import style from './FormAuth.module.scss';

export default function FormAuth({ textButton, text }) {
  const triggerPopap = text === 'Pегистрация';
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    e.preventDefault();
    if (triggerPopap) {
      dispatch(fetchAddUser({ email, password }));
    } else {
      dispatch(fetchLoginUser({ email, password }));
    }
    dispatch(setFormSign());
  };

  return (
    <div className={style.overflow}>
      <div className={style.form_contener}>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
          <div
            onClick={() =>
              dispatch(triggerPopap ? setfopmReg() : setFormSign())
            }
            className={style.buttoncloseform}
          >
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
