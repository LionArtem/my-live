import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTopics, fetchGetTopic } from '../../../redax/slices/topicSlice';
import {
  fetchGetUser,
  fetchGetUserId,
  fetchGetUserFindId,
} from '../../../redax/slices/userSlice';

import FormMessage from '../../FormMessage/FormMessage';
import MessageUser from '../../MessageUser/MessageUser';

export default function Topic() {
  const dispatch = useDispatch();
  const { authorTopic, titleTopic } = useSelector(selectTopics);

  const collectNewArrMessage = (res) => {
    // собираю массив уникальных id users
    const result = res.reduce((acc, obj) => {
      if (acc.find((item) => item === obj.userId)) {
        return acc;
      }
      return [...acc, obj.userId];
    }, []);
    return result;
  };

  const getMessages = () => {
    dispatch(fetchGetTopic({ id: localStorage.getItem('topicId') })).then(
      (resMessage) => {
        if (resMessage.meta.requestStatus === 'fulfilled') {
          dispatch(
            fetchGetUserFindId({
              arrIdUser: collectNewArrMessage(resMessage.payload.messages),
              messages: resMessage.payload.messages,
            })
          );
        }
      }
    );
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
    </div>
  );
}
