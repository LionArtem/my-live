import React from 'react';
import Style from './ModulConfirmation.module.scss';

export default function ModulConfirmation({ text }) {
  return (
    <div className={Style.overfloy}>
      <div className={Style.window}>
        <p className={Style.title}>{text}</p>
        <p className={Style.yes}>Да</p>
        <p className={Style.no}>Нет</p>
      </div>
    </div>
  );
}
