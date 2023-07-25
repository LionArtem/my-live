import React from 'react';
import Style from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { selectTopics } from '../../redax/slices/topicSlice';

export default function Pagination({ getNumberPage }) {
  const { numberPages } = useSelector(selectTopics);
  return (
    <nav>
      <ul className={Style.list}>
        {numberPages.map((res, i) => (
          <li
            key={i}
            onClick={() => {
              getNumberPage(i + 1);
              localStorage.setItem('page', i + 1);
            }}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </nav>
  );
}
