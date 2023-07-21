import React from 'react';

import { useDispatch } from 'react-redux';
import { fetchTopicAll } from '../../redax/slices/topicSlice';
import { topicApi } from '../../utils/TopicApi';
import Topic from './TopicList/TopicList';

export default function ForumTopics() {
  const titleRef = React.useRef();
  const dispatch = useDispatch();

  const addPost = (e) => {
    e.preventDefault();
    topicApi
      .addNewTopic(titleRef.current.value)
      .then(() => {
        dispatch(fetchTopicAll());
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    dispatch(fetchTopicAll());
  }, []);

  return (
    <>
      <form onSubmit={(e) => addPost(e)}>
        <input
          ref={titleRef}
          type="text"
          placeholder="введите название темы"
          required
        ></input>
        <button type="submit">создать новую тему</button>
      </form>
      <Topic />
    </>
  );
}
