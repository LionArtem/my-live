import React from 'react';
import Style from './FormMessage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessageValue,
  selectTopics,
  fetchAddMessageInTopic,
} from '../../redax/slices/topicSlice';

import { selectUser } from '../../redax/slices/userSlice';

export default function Form({ getMessages }) {
  const textAreaRef = React.useRef();
  const formRef = React.useRef();
  const { messageValue } = useSelector(selectTopics);
  const { allMessagesAndAuthors } = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchAddMessageInTopic({
        id: localStorage.getItem('topicId'),
        userId: localStorage.getItem('userId'),
        message: messageValue,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        getMessages();
      }
    });
  };
 
  return (
    <>
      {allMessagesAndAuthors.length >= 10 ? (
        ''
      ) : (
        <form
          onSubmit={(e) => handleSubmit(e)}
          ref={formRef}
          className={Style.form}
        >
          <textarea
            placeholder="text"
            ref={textAreaRef}
            value={messageValue}
            onChange={(e) => {
              dispatch(setMessageValue(e.target.value));
            }}
            className={Style.input}
            type="text"
          ></textarea>
          <button className={Style.button} type="submit">
            Отправить
          </button>
        </form>
      )}
    </>
  );
}
