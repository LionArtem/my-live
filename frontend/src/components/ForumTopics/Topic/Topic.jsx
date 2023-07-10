import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTopics, fetchGetTopic } from '../../../redax/slices/topicSlice';

import FormMessage from '../../FormMessage/FormMessage';
import MessageUser from '../../MessageUser/MessageUser';

export default function Topic() {
  const dispatch = useDispatch();
  const { authorTopic } = useSelector(selectTopics);

  React.useEffect(() => {
    dispatch(fetchGetTopic({ id: localStorage.getItem('authorId') }));
  }, []);

  return (
    <div>
      <div>
        <h1>{authorTopic.title}</h1>
        <h2>{authorTopic.name}</h2>
      </div>
      <MessageUser />
      <FormMessage />
    </div>
  );
}
