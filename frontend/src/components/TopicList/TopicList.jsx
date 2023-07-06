import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTopics } from '../../redax/slices/topicSlice';
import { Link } from 'react-router-dom';

export default function TopicList() {
  const { topicsAll } = useSelector(selectTopics);

  return (
    <div>
      {topicsAll &&
        topicsAll.map((obj) => (
          <Link>
            <h1 key={obj._id}>{obj.title}</h1>
          </Link>
        ))}
    </div>
  );
}
