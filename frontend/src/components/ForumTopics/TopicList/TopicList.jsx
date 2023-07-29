import React from 'react';
import { useSelector } from 'react-redux';
import Style from './TopicList.module.scss';

import { selectTopics } from '../../../redax/slices/topicSlice';
import { Link } from 'react-router-dom';

export default function TopicList() {
  const { topicsInPage } = useSelector(selectTopics);

  return (
    <div className={Style.conteiner}>
      {topicsInPage &&
        topicsInPage.map((obj) => (
          <Link to={'/topic'} key={obj._id}>
            <h1
              onClick={() => {
                localStorage.setItem('topicId', obj._id);
              }}
            >
              {obj.title}
            </h1>
          </Link>
        ))}
    </div>
  );
}
