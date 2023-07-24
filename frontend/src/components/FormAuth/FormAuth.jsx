import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddUser,
  fetchLoginUser,
  setfopmReg,
  setFormSign,
  selectAuth,
  resetErrMessage,
} from '../../redax/slices/authSlice';

import {
  setValue,
  selectformValidetion,
  killAllStateFormValidetion,
} from '../../redax/slices/formValidetionSlice';

import Style from './FormAuth.module.scss';
import PreloaderPoint from '../Preloaders/PreloaderPoint/PreloaderPoint';

export default function FormAuth({ textButton, text }) {
  const { value, errors, valid } = useSelector(selectformValidetion);
  const { showPreloader, errMessage } = useSelector(selectAuth);
  const triggerPopap = text === 'Pегистрация';
  const dispatch = useDispatch();

  const resetForm = () => {
    dispatch(setFormSign());
    dispatch(killAllStateFormValidetion());
  };

  const handleSubmit = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    e.preventDefault();
    if (triggerPopap) {
      dispatch(fetchAddUser({ email, password })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(fetchLoginUser({ email, password })).then(() => {
            resetForm();
          });
        }
      });
    } else {
      dispatch(fetchLoginUser({ email, password })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          resetForm();
        }
      });
    }
  };

  const collectValidetion = (evt) => {
    errMessage.length > 0 && dispatch(resetErrMessage());
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
    <div className={Style.overflow}>
      <div className={Style.form_contener}>
        <form onSubmit={(e) => handleSubmit(e)} className={Style.form}>
          <div
            onClick={() => {
              dispatch(triggerPopap ? setfopmReg() : setFormSign());
              dispatch(killAllStateFormValidetion());
            }}
            className={Style.buttoncloseform}
          >
            закрыть
          </div>
          <p className={Style.title}>{text}</p>
          <input
            pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z0-9_\-]+"
            value={value.email ?? ''}
            onChange={(evt) => {
              collectValidetion(evt);
            }}
            type="email"
            name="email"
            placeholder="email"
            required
          ></input>
          <span className={Style.error}>{errors.email}</span>
          <input
            value={value.password ?? ''}
            onChange={(evt) => {
              collectValidetion(evt);
            }}
            type="password"
            name="password"
            placeholder="пароль"
            minLength={8}
            required
          ></input>
          <span className={Style.error}>{errors.password}</span>
          {valid ? (
            <>
              {' '}
              <button type="submit" className={Style.button}>
                {textButton}
                {showPreloader && <PreloaderPoint />}
              </button>
            </>
          ) : (
            <>
              {' '}
              <button
                disabled
                type="submit"
                className={`${Style.button} ${Style.buttonOff}`}
              >
                {textButton}
              </button>
            </>
          )}
          <span className={Style.error}>{errMessage}</span>
        </form>
      </div>
    </div>
  );
}
