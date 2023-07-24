import React from 'react';

import Style from './FormEditUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  setValue,
  selectformValidetion,
  defaultValues,
  killAllStateFormValidetion,
} from '../../redax/slices/formValidetionSlice';

import {
  fetchGetUser,
  fetchPatchUser,
  selectUser,
} from '../../redax/slices/userSlice';

export default function FormEditUser() {
  const dispatch = useDispatch();

  const { value, errors, valid } = useSelector(selectformValidetion);
  const { user } = useSelector(selectUser);

  React.useEffect(() => {
    return () => dispatch(killAllStateFormValidetion());
  }, []);

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

  const findNoCoincidenceForm = (value1, value2) => {
    const valid =
      value1.age === value2.age &&
      value1.avatar === value2.avatar &&
      value1.email === value2.email &&
      value1.gender === value2.gender &&
      value1.name === value2.name &&
      value1.sity === value2.sity;
    return valid;
  };

  const hendelSumit = (evt) => {
    evt.preventDefault();
    if (findNoCoincidenceForm(user, value)) {
    } else {
      dispatch(fetchPatchUser());
    }
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
        <label>ссылка на фото</label>
        <input
          pattern="^\S*$"
          type="url"
          value={value.avatar ?? ''}
          name="avatar"
          onChange={(evt) => changeValue(evt)}
          placeholder="ввидите ссылку на фотографию"
          required
        ></input>
        <span className={Style.error}>{errors.avatar}</span>
        <label>ваше имя</label>
        <input
          pattern="^\S*$"
          value={value.name ?? ''}
          onChange={(evt) => changeValue(evt)}
          name="name"
          placeholder="ввидите имя"
          required
          minLength={1}
          maxLength={30}
        ></input>
        <span className={Style.error}>{errors.name}</span>
        <div className={Style.conteinerAgeGender}>
          <label>возраст</label>
          <input
            className={Style.age}
            value={value.age ?? ''}
            onChange={(evt) => changeValue(evt)}
            name="age"
            type="number"
            min={18}
            max={80}
            placeholder="выберите ваш возраст"
            required
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
          pattern="^\S*$"
          value={value.sity ?? ''}
          onChange={(evt) => changeValue(evt)}
          name="sity"
          placeholder="ввидите ваш город"
          required
          minLength={1}
          maxLength={30}
        ></input>
        <span className={Style.error}>{errors.sity}</span>
        <label>email</label>
        <input
          pattern="^\S*$"
          value={value.email ?? ''}
          onChange={(evt) => changeValue(evt)}
          name="email"
          type="email"
          placeholder="ввидите your email"
          required
        ></input>
        <span className={Style.error}>{errors.email}</span>
        {valid ? (
          <button className={Style.buttonForm} type="submit">
            редактировать профиль
          </button>
        ) : (
          <button
            disabled
            className={`${Style.buttonForm} ${Style.buttonFormOff}`}
            type="submit"
          >
            редактировать профиль
          </button>
        )}
        <span className={Style.error}></span>
        <span className={Style.success}></span>
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
