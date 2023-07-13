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

  return (
    <>
      {' '}
      <form onSubmit={(evt) => hendelSumit(evt)} className={Style.form}>
        <label>link foto</label>
        <input
          value={value.avatar ? value.avatar : ''}
          name="avatar"
          onChange={(evt) => changeValue(evt)}
          placeholder="ввидите ссылку на фотографию"
        ></input>
        <label>name</label>
        <input
          value={value.name ? value.name : ''}
          onChange={(evt) => changeValue(evt)}
          name="name"
          placeholder="ввидите name"
        ></input>
        <label>age</label>
        <input
          value={value.age ? value.age : ''}
          onChange={(evt) => changeValue(evt)}
          name="age"
          type="number"
          placeholder="ввидите your age"
        ></input>
        <label>sity</label>
        <input
          value={value.sity ? value.sity : ''}
          onChange={(evt) => changeValue(evt)}
          name="sity"
          placeholder="ввидите your sity"
        ></input>
        <label>email</label>
        <input
          value={value.email ? value.email : ''}
          onChange={(evt) => changeValue(evt)}
          name="email"
          type="email"
          placeholder="ввидите your email"
        ></input>
        <button type="submit">edit</button>
      </form>
      <Link to="/my-page">
        <p>назад</p>
      </Link>
      <Link to="/">
        <p>На главную</p>
      </Link>
    </>
  );
}
