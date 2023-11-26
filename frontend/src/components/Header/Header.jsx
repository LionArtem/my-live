import React from 'react';

import Style from './Header.module.scss'

export default function Header() {
 
  return (
    <div className={Style.header}>
      <h1 className={Style.title}>My Live</h1>
    </div>
  );
}
