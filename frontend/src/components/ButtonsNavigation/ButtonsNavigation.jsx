import React from 'react';
import { Link } from 'react-router-dom';

import Style from './ButtonsNavigation.module.scss';

export default function ButtonsNavigation({ page, text }) {
  return (
    <Link to={page}>
      <p className={Style.button}>{text}</p>
    </Link>
  );
}
