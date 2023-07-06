import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectTopics,
  addAuthorTopic,
  fetchGetTopic,
} from '../../../redax/slices/topicSlice';
import { Link } from 'react-router-dom';

export default function TopicList() {
  const dispatch = useDispatch();
  const { topicsAll } = useSelector(selectTopics);

  return (
    <div>
      {topicsAll &&
        topicsAll.map((obj) => (
          <Link to={'/topic'} key={obj._id}>
            <h1
              onClick={() => {
                localStorage.setItem('authorId', obj._id);
                // dispatch(fetchGetTopic({ id: obj._id }));
              }}
            >
              {obj.title}
            </h1>
          </Link>
        ))}
    </div>
  );
}
