import React from 'react';

import { useDispatch } from 'react-redux';
import {
  fetchGetTopicPaginetion,
  killAllStateTopic,
  fetchAddTopic,
} from '../../redax/slices/topicSlice';
import Topic from './TopicList/TopicList';
import Pagination from '../Pagination/Pagination';

export default function ForumTopics() {
  const titleRef = React.useRef();
  const dispatch = useDispatch();

  const getTopic = (page = localStorage.getItem('page') ?? 1) => {
    dispatch(fetchGetTopicPaginetion(page));
  };

  const addPost = (e) => {
    e.preventDefault();
    dispatch(fetchAddTopic(titleRef.current.value)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        getTopic();
      }
    });
  };

  React.useEffect(() => {
    getTopic();
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(killAllStateTopic());
      localStorage.removeItem('page');
    };
  });

  return (
    <>
      <form onSubmit={(e) => addPost(e)}>
        <input
          ref={titleRef}
          type="text"
          placeholder="введите название темы"
          required
          minLength={5}
          maxLength={50}
        ></input>
        <button type="submit">создать новую тему</button>
      </form>
      <Topic />
      <Pagination getNumberPage={getTopic} />
    </>
  );
}
