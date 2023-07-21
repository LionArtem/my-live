import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectTopics,
  fetchGetMessagePaginetion,
} from '../../../redax/slices/topicSlice';
import {
  fetchGetUser,
  fetchGetUserFindId,
} from '../../../redax/slices/userSlice';

import FormMessage from '../../FormMessage/FormMessage';
import MessageUser from '../../MessageUser/MessageUser';
import Pagination from '../../Pagination/Pagination';

export default function Topic() {
  const dispatch = useDispatch();
  const { authorTopic, titleTopic } = useSelector(selectTopics);

  const collectNewArrMessage = (res) => {
    // собираю массив уникальных id users
    const result = res.messages.reduce((acc, obj) => {
      if (acc.find((item) => item === obj.userId)) {
        return acc;
      }
      return [...acc, obj.userId];
    }, []);
    return result;
  };

  const getMessages = (
    page = localStorage.getItem('page') ? localStorage.getItem('page') : 1
  ) => {
    dispatch(
      fetchGetMessagePaginetion({ id: localStorage.getItem('topicId'), page })
    ).then((resMessage) => {
      if (resMessage.meta.requestStatus === 'fulfilled') {
        dispatch(
          fetchGetUserFindId({
            arrIdUser: collectNewArrMessage(resMessage.payload),
            messages: resMessage.payload,
          })
        );
      }
    });
  };

  React.useEffect(() => {
    getMessages();
    dispatch(fetchGetUser());
  }, []);

  return (
    <div>
      <div>
        <h1>{titleTopic}</h1>
        <h2>{authorTopic.name}</h2>
      </div>
      <MessageUser />
      <FormMessage getMessages={getMessages} />
      <Pagination getMessages={getMessages} />
    </div>
  );
}
