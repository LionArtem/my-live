import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './TopicList.module.scss';

import { selectTopics } from '../../../redax/slices/topicSlice';
import { selectUser, fetchGetUser } from '../../../redax/slices/userSlice';
import { selectAuth } from '../../../redax/slices/authSlice';
import { Link } from 'react-router-dom';

export default function TopicList() {
  const dispatch = useDispatch();
  const { topicsInPage } = useSelector(selectTopics);
  const { user } = useSelector(selectUser);
  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    dispatch(fetchGetUser(token));
  }, []);

  console.log(user);

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
            {user.admin && <button>удалить</button>}
          </Link>
        ))}
    </div>
  );
}
