import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Style from './ForumTopics.module.scss';
import { topicApi } from '../../utils/TopicApi';

import {
  fetchGetTopicPaginetion,
  killAllStateTopic,
  fetchAddTopic,
  selectTopics,
  resetSuccessRequest,
  resetTextAnswerRequest,
} from '../../redax/slices/topicSlice';
import {
  selectformValidetion,
  setValue,
  resetValues,
} from '../../redax/slices/formValidetionSlice';

import TopicList from './TopicList/TopicList';
import Pagination from '../Pagination/Pagination';
import ButtonsNavigation from '../Buttons/ButtonsNavigation/ButtonsNavigation';
import BottonSubmit from '../Buttons/BottonSubmit/BottonSubmit';
import TextInteractionForm from '../TextInteractionForm/TextInteractionForm';
import ErrServer from '../ErrServer/ErrServer';
import NavigationNotAuthUser from '../NavigationNotAuthUser/NavigationNotAuthUser';

export default function ForumTopics() {
  const dispatch = useDispatch();

  const { value, errors, valid } = useSelector(selectformValidetion);
  const {
    showPreloader,
    successRequest,
    textAnswerRequest,
    srrTopicServer,
    numberPages,
  } = useSelector(selectTopics);

  const getTopic = (page = localStorage.getItem('page') ?? 1) => {
    dispatch(fetchGetTopicPaginetion({ page }));
  };

  const addPost = (e) => {
    e.preventDefault();
    dispatch(fetchAddTopic(value.topic)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setTimeout(() => dispatch(resetSuccessRequest()), 1500);
        getTopic();
      }
      setTimeout(() => dispatch(resetTextAnswerRequest()), 1500);
      dispatch(resetValues());
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
  }, []);

  const changeValue = (evt) => {
    dispatch(
      setValue({
        value: evt.target.value,
        name: evt.target.name,
        errors: evt.target.validationMessage,
        valid: evt.target.closest('form').checkValidity(),
      })
    );
  };

  return (
    <div className={Style.conteiner}>
      {localStorage.getItem('token') ? (
        <ButtonsNavigation page={'/'} text={'Назад'} />
      ) : (
        ''
      )}
      {srrTopicServer ? (
        <ErrServer textErr="На сервере произошла ошибка, попробуйте зайти позже." />
      ) : (
        <>
          {localStorage.getItem('token') ? (
            <form onSubmit={(e) => addPost(e)}>
              <div>
                <input
                  type="text"
                  placeholder="введите название темы"
                  required
                  value={value.topic ?? ''}
                  name="topic"
                  onChange={(evt) => changeValue(evt)}
                  minLength={5}
                  maxLength={50}
                ></input>
                <TextInteractionForm text={errors.topic} />
              </div>
              <BottonSubmit
                valid={valid}
                showPreloader={showPreloader}
                successRequest={successRequest}
                textAnswerRequest={textAnswerRequest}
                text={'создать тему'}
              />
            </form>
          ) : (
            <NavigationNotAuthUser
              text={'Что бы создать тему нужно авторизироваться'}
            >
              <ButtonsNavigation page={'/'} text={'Назад'} />
            </NavigationNotAuthUser>
          )}
          <TopicList getTopic={getTopic} />
          {numberPages.length > 1 && <Pagination getNumberPage={getTopic} />}
        </>
      )}
    </div>
  );
}
