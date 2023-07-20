import React from 'react';
import Style from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { selectTopics } from '../../redax/slices/topicSlice';

export default function Pagination() {
  const { numberPages } = useSelector(selectTopics);
  return (
    <nav>
      <ul className={Style.list}>
        {numberPages.map((res, i) => (
          <li key={i}>{i + 1}</li>
        ))}
      </ul>
    </nav>
  );
}
