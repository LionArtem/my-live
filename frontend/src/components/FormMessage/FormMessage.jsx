import React from 'react';
import Style from './FormMessage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddMessageInTopic } from '../../redax/slices/topicSlice';

import { selectUser } from '../../redax/slices/userSlice';

import {
  setValue,
  selectformValidetion,
  resetValues,
} from '../../redax/slices/formValidetionSlice';
import BottonSubmit from '../Buttons/BottonSubmit/BottonSubmit';
import TextInteractionForm from '../TextInteractionForm/TextInteractionForm';

export default function Form({ getMessages }) {
  const { allMessagesAndAuthors } = useSelector(selectUser);
  const { value, errors, valid } = useSelector(selectformValidetion);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      fetchAddMessageInTopic({
        id: localStorage.getItem('topicId'),
        userId: localStorage.getItem('userId'),
        message: value.textarea,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        getMessages();
        dispatch(resetValues());
      }
    });
  };

  const validetionTextarea = (evt) => {
    const regex = /[^\s]+/;
    const result = regex.test(evt.target.value);
    if (result) {
      return { checkValid: true };
    } else {
      return { checkValid: false, taxtErr: 'ввидите минимум один символ' };
    }
  };

  const changeValue = (evt) => {
    dispatch(
      setValue({
        value: evt.target.value,
        name: evt.target.name,
        errors: validetionTextarea(evt).taxtErr,
        valid: validetionTextarea(evt).checkValid,
      })
    );
  };

  return (
    <>
      {allMessagesAndAuthors.length >= 10 ? (
        ''
      ) : (
        <form onSubmit={(evt) => handleSubmit(evt)} className={Style.form}>
          <textarea
            value={value.textarea ?? ''}
            onChange={(evt) => {
              changeValue(evt);
            }}
            className={Style.textarea}
            type="text"
            name="textarea"
            required
            maxLength={500}
          ></textarea>
           <TextInteractionForm text={errors.textarea} />
          <BottonSubmit
            valid={valid}
            //showPreloader={showPreloader}
            //successRequest={successRequest}
            //textAnswerRequest={textAnswerRequest}
            text={'отправить'}
          />
        </form>
      )}
    </>
  );
}
