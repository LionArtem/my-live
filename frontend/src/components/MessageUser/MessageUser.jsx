import React from 'react';

import Style from './MessageUser.scss';

export default function MessageUser({ text }) {
  return (
    <div className={Style.root}>
      <div className={Style.useConteiner}>
        <img
          className={Style.foto}
          src="https://images.unsplash.com/photo-1674156395389-2574986a9c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt='аватарка'
        />
        <h3>Name(ж.30)</h3>
        <p>Sity</p>
        <span>2023-02-24 15.00</span>
      </div>
      <p className={Style.massage}>{text.massege}</p>
    </div>
  );
}
