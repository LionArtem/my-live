import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTopicAll, selectTopics } from '../../redax/slices/topicSlice';

export default function ForumTopics() {
  const dispatch = useDispatch();
  const { topicsAll } = useSelector(selectTopics);

  React.useEffect(() => {
    dispatch(fetchTopicAll());
  }, []);

  return (
    <>
      {/* <h1>same</h1> */}
      {topicsAll && topicsAll.map((obj) => <h1 key={obj._id}>{obj.name}</h1>)}
    </>
  );
}
