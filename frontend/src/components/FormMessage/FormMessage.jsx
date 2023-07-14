import React from 'react';
import Style from './FormMessage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessageValue,
  selectTopics,
  fetchAddMessageInTopic,
} from '../../redax/slices/topicSlice';

export default function Form() {
  const textAreaRef = React.useRef();
  const formRef = React.useRef();
  const { messageValue } = useSelector(selectTopics);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchAddMessageInTopic({
        id: localStorage.getItem('authorId'),
        user :JSON.parse(localStorage.getItem('user')),
        message: messageValue,
      })
    );
  };

  return (
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
  );
}
