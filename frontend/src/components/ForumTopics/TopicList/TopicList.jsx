import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopics } from '../../../redax/slices/topicSlice';
import { Link } from 'react-router-dom';

export default function TopicList() {
  const { topicsAll } = useSelector(selectTopics);

  return (
    <div>
      {topicsAll &&
        topicsAll.map((obj) => (
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
