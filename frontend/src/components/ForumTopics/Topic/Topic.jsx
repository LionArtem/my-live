import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './Topic.module.scss';

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
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';

export default function Topic() {
  const dispatch = useDispatch();
  const { authorTopic, titleTopic, date } = useSelector(selectTopics);
  const arrDate = date.split(' ');
  const strDate = `${arrDate[1]} ${arrDate[2]} ${arrDate[3]} ${arrDate[4]} `;
  console.log(strDate);


  const findUniqueAuthors = (res) => {
    // собираю массив уникальных id users
    const result = res.messages.reduce((acc, obj) => {
      if (acc.find((item) => item === obj.userId)) {
        return acc;
      }
      return [...acc, obj.userId];
    }, []);
    return result;
  };

  const getMessages = (page = localStorage.getItem('page') ?? 1) => {
    dispatch(
      fetchGetMessagePaginetion({ id: localStorage.getItem('topicId'), page })
    ).then((resMessage) => {
      if (resMessage.meta.requestStatus === 'fulfilled') {
        dispatch(
          fetchGetUserFindId({
            arrIdUser: findUniqueAuthors(resMessage.payload),
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
    <div className={Style.topic}>
      <div className={Style.conteiner_navigation}>
        <ButtonsNavigation page={'/topics'} text={'Назад'} />
        <ButtonsNavigation page={'/'} text={'На главную'} />
      </div>
      <div className={Style.info_topic}>
        <h1>{titleTopic}</h1>
        <div className={Style.use_conteiner}>
          <img src={authorTopic.avatar} alt="аватарка" />
          <h3>{`${authorTopic.name} (${authorTopic.gender}.${authorTopic.age})`}</h3>
          <p>{authorTopic.sity}</p>
          <span>2023-02-24 15.00</span>
        </div>
      </div>
      <MessageUser getMessages={getMessages} />
      <FormMessage getMessages={getMessages} />
      <Pagination getNumberPage={getMessages} />
    </div>
  );
}
