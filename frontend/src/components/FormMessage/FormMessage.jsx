import React from 'react';
import Style from './FormMessage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddMessageInTopic } from '../../redax/slices/topicSlice';

import { selectUser } from '../../redax/slices/userSlice';

import {
  setValue,
  selectformValidetion,
  resetValues,
  setValid,
} from '../../redax/slices/formValidetionSlice';
import BottonSubmit from '../Buttons/BottonSubmit/BottonSubmit';
import TextInteractionForm from '../TextInteractionForm/TextInteractionForm';

export default function Form({ getMessages }) {
  const messageRef = React.useRef();
  const { allMessagesAndAuthors } = useSelector(selectUser);
  const { value, errors, valid } = useSelector(selectformValidetion);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addMessage();
  };

  React.useEffect(() => {
    console.log(valid);
    if (valid) {
      const onKeyDown = (evt) => {
        if (evt.keyCode === 13) {
          addMessage();
        }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [valid]);

  const addMessage = () => {
    dispatch(
      fetchAddMessageInTopic({
        id: localStorage.getItem('topicId'),
        userId: localStorage.getItem('userId'),
        message: messageRef.current.value,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        getMessages();
        dispatch(resetValues());
        dispatch(setValid());
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
            ref={messageRef}
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
