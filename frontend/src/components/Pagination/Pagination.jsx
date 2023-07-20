import React from 'react';
import Style from './Pagination.module.scss';

export default function Pagination() {
  return (
    <nav>
      <ul className={Style.list}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </nav>
  );
}
