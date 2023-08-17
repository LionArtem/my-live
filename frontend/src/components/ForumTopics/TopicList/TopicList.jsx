import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './TopicList.module.scss';

import {
  selectTopics,
  fetchDeleteTopic,
} from '../../../redax/slices/topicSlice';
import { selectUser, fetchGetUser } from '../../../redax/slices/userSlice';
import { selectAuth } from '../../../redax/slices/authSlice';
import { Link } from 'react-router-dom';

import { getTimeLocal } from '../../../utils/utils';
import TopicListPreloader from './TopicListPreloader';

export default function TopicList({ getTopic }) {
  const dispatch = useDispatch();
  const { topicsInPage, showPreloaderTopic } = useSelector(selectTopics);
  const { user } = useSelector(selectUser);
  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    if (token) {
      dispatch(fetchGetUser(token));
    }
  }, []);

  const deleteTopic = (evt, id) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(fetchDeleteTopic(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        getTopic();
      }
    });
  };

  return (
    <div className={Style.conteiner}>
      {showPreloaderTopic ? (
        <div className={Style.preloader_conteiner}>
          {[...new Array(10)].map((_, i) => (
            <TopicListPreloader key={i} />
          ))}
        </div>
      ) : (
        topicsInPage &&
        topicsInPage.map((obj) => (
          <Link to={'/topic'} key={obj._id}>
            <h1
              onClick={() => {
                localStorage.setItem('topicId', obj._id);
              }}
            >
              {obj.title}
            </h1>
            <p>{getTimeLocal(obj.createdAt)}</p>
            {user.admin && (
              <button
                className={Style.button_delete}
                onClick={(evt) => deleteTopic(evt, obj._id)}
              ></button>
            )}
          </Link>
        ))
      )}
    </div>
  );
}
