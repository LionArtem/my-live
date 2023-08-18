import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './Topic.module.scss';

import {
  selectTopics,
  fetchGetMessagePaginetion,
  isShowPreloaderMessage,
} from '../../../redax/slices/topicSlice';
import {
  // fetchGetUser,
  fetchGetUserFindId,
  selectUser,
} from '../../../redax/slices/userSlice';

import FormMessage from '../../FormMessage/FormMessage';
import MessageUser from '../../MessageUser/MessageUser';
import Pagination from '../../Pagination/Pagination';
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';

import { getTimeLocal } from '../../../utils/utils';
import ErrServer from '../../ErrServer/ErrServer';
import TopicPreloader from './TopicPreloader';
import { selectAuth } from '../../../redax/slices/authSlice';

export default function Topic() {
  const dispatch = useDispatch();
  const {
    authorTopic,
    titleTopic,
    date,
    errGetMessage,
    showPreloaderMessage,
    numberPages,
  } = useSelector(selectTopics);
  const { errServerUserMessage } = useSelector(selectUser);

  const findUniqueAuthors = (res) => {
    // собираю массив уникальных id users
    let set = new Set(); // лучше производительность
    res.messages.forEach((element) => {
      set.add(element.userId);
    });
    const arrUniqueUserId = Array.from(new Set(set));
    return arrUniqueUserId;

    // const result = res.messages.reduce((acc, obj) => {
    //   if (acc.find((item) => item === obj.userId)) {
    //     return acc;
    //   }
    //   return [...acc, obj.userId];
    // }, []);
    // return result;
  };

  const getMessages = (page = localStorage.getItem('page') ?? 1) => {
    dispatch(isShowPreloaderMessage(true));
    dispatch(
      fetchGetMessagePaginetion({
        id: localStorage.getItem('topicId'),
        page,
      })
    ).then((resMessage) => {
      if (resMessage.meta.requestStatus === 'fulfilled') {
        dispatch(
          fetchGetUserFindId({
            arrIdUser: findUniqueAuthors(resMessage.payload),
            messages: resMessage.payload,
          })
        ).then(() => {
          dispatch(isShowPreloaderMessage(false));
        });
      }
    });
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className={Style.topic}>
      <div className={Style.conteiner_navigation}>
        <ButtonsNavigation page={'/topics'} text={'Назад'} />
        <ButtonsNavigation page={'/'} text={'На главную'} />
      </div>
      {errGetMessage || errServerUserMessage ? (
        <ErrServer textErr="На сервере произошла ошибка, попробуйте зайти позже." />
      ) : (
        <>
          <div className={Style.info_topic}>
            {showPreloaderMessage ? (
              <TopicPreloader />
            ) : (
              <>
                {' '}
                <h1>{titleTopic}</h1>
                <div className={Style.use_conteiner}>
                  <img src={authorTopic.avatar} alt="аватарка" />
                  <h3>{`${authorTopic.name} (${authorTopic.gender}.${authorTopic.age})`}</h3>
                  <p>{authorTopic.sity}</p>
                  <span>{getTimeLocal(date)}</span>
                </div>
              </>
            )}
          </div>
          <MessageUser getMessages={getMessages} />
          <FormMessage getMessages={getMessages} />
          {numberPages.length > 1 && <Pagination getNumberPage={getMessages} />}
        </>
      )}
    </div>
  );
}
