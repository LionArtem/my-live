import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopics } from '../../../redax/slices/topicSlice';

export default function Topic() {
  const { authorTopic } = useSelector(selectTopics);
  const { name } = authorTopic.owner;
  const { title } = authorTopic;
  console.log(authorTopic);

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <h2>{name}</h2>
      </div>
    </div>
  );
}
