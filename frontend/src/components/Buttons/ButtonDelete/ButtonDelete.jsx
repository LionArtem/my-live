import React from 'react';
import Style from './ButtonDelete.module.scss';

export default function ButtonDelete({ text, onClick }) {
  return (
    <div onClick={onClick} className={Style.ButtonDelete}>
      {text}
    </div>
  );
}
