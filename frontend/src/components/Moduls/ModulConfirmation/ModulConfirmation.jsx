import React from 'react';
import Style from './ModulConfirmation.module.scss';

export default function ModulConfirmation({ text }) {
  return (
    <div className={Style.overfloy}>
      <div className={Style.window}>
        <p className={Style.title}>{text}</p>
        <p className={`${Style.buttonYes} ${Style.button}`}>Да</p>
        <p className={`${Style.buttonNo} ${Style.button}`}>Нет</p>
      </div>
    </div>
  );
}
