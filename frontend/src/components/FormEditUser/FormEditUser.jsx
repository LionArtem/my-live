import React from 'react';

import Style from './FormEditUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  setValue,
  selectformValidetion,
  defaultValues,
} from '../../redax/slices/formValidetionSlice';

import { fetchGetUser, fetchPatchUser } from '../../redax/slices/userSlice';

export default function FormEditUser() {
  const dispatch = useDispatch();

  const { value } = useSelector(selectformValidetion);

  React.useEffect(() => {
    dispatch(fetchGetUser()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(
          defaultValues({
            name: res.payload.name,
            email: res.payload.email,
            age: res.payload.age,
            avatar: res.payload.avatar,
            sity: res.payload.sity,
            gender: res.payload.gender,
          })
        );
      }
    });
  }, []);

  const hendelSumit = (evt) => {
    evt.preventDefault();
    dispatch(fetchPatchUser());
  };

  const changeValue = (evt) => {
    dispatch(
      setValue({
        value: evt.target.value,
        name: evt.target.name,
        errors: evt.target.validationMessage,
        valid: evt.target.closest('form').checkValidity(),
      })
    );
  };

  console.log();

  return (
    <>
      {' '}
      <form onSubmit={(evt) => hendelSumit(evt)} className={Style.form}>
        <label>ссылка на фото</label>
        <input
          type="url"
          value={value.avatar ? value.avatar : ''}
          name="avatar"
          onChange={(evt) => changeValue(evt)}
          placeholder="ввидите ссылку на фотографию"
          required
        ></input>
        <label>ваше имя</label>
        <input
          value={value.name ? value.name : ''}
          onChange={(evt) => changeValue(evt)}
          name="name"
          placeholder="ввидите имя"
          required
          minLength={1}
          maxLength={30}
        ></input>
        <div className={Style.conteinerAgeGender}>
          <label>возраст</label>
          <input
            className={Style.age}
            value={value.age ? value.age : ''}
            onChange={(evt) => changeValue(evt)}
            name="age"
            type="number"
            min={18}
            max={80}
            placeholder="выберите ваш возраст"
          ></input>
          <label>м</label>
          <input
            checked={value.gender === 'м' ? 'checked' : ''}
            className={Style.radio}
            value="м"
            onChange={(evt) => changeValue(evt)}
            type="radio"
            name="gender"
            placeholder="ввидите пол"
          ></input>

          <label>ж</label>
          <input
            checked={value.gender === 'ж' ? 'checked' : ''}
            className={Style.radio}
            value="ж"
            onChange={(evt) => changeValue(evt)}
            type="radio"
            name="gender"
            placeholder="ввидите пол"
          ></input>
        </div>

        <label>город</label>
        <input
          value={value.sity ? value.sity : ''}
          onChange={(evt) => changeValue(evt)}
          name="sity"
          placeholder="ввидите ваш город"
        ></input>
        <label>email</label>
        <input
          value={value.email ? value.email : ''}
          onChange={(evt) => changeValue(evt)}
          name="email"
          type="email"
          placeholder="ввидите your email"
        ></input>
        <button className={Style.buttonForm} type="submit">
          редактировать профиль
        </button>
      </form>
      <Link className={`${Style.buttonForm} ${Style.button} `} to="/my-page">
        <p>назад</p>
      </Link>
      <Link className={`${Style.buttonForm} ${Style.button} `} to="/">
        <p>На главную</p>
      </Link>
    </>
  );
}
