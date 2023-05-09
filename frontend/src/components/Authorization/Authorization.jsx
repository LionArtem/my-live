import React from 'react';

import Style from './Authorization.module.scss';
import FormAuth from '../FormAuth/FormAuth';

export default function Authorization() {
  const [fopmReg, isFormReg] = React.useState(false);
  const [fopmSign, isFormSign] = React.useState(false);
  return (
    <div className={Style.contenerAuth}>
      <p className={Style.buttonOpen} onClick={() => isFormReg(true)}>
        Регистрация
      </p>
      <p className={Style.buttonOpen} onClick={() => isFormSign(true)}>
        Войти
      </p>
      {fopmReg && (
        <FormAuth
          text="Pегистрация"
          textButton="зарегистрироваться"
          isForm={isFormReg}
        />
      )}
      {fopmSign && (
        <FormAuth text="Авторизация" textButton="войти" isForm={isFormSign} />
      )}
    </div>
  );
}
