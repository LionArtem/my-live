import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Style from './MessageUser.module.scss';

import { selectUser } from '../../redax/slices/userSlice';
import {
  fetchDeleteMessage,
  selectTopics,
} from '../../redax/slices/topicSlice';

import { getTimeLocal } from '../../utils/utils';
import MessageUserPreloader from './MessageUserPreloader';

export default function MessageUser({ getMessages }) {
  const dispatch = useDispatch();
  const { allMessagesAndAuthors, user } = useSelector(selectUser);
  const { showPreloaderMessage } = useSelector(selectTopics);

  const deleteMessage = (obj) => {
    dispatch(
      fetchDeleteMessage({
        messageId: obj.messages._id,
        topicId: localStorage.getItem('topicId'),
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        getMessages();
      }
    });
  };

  return (
    <>
      {showPreloaderMessage ? (
        [...new Array(10)].map((_, i) => <MessageUserPreloader key={i} />)
      ) : allMessagesAndAuthors.length > 0 ? (
        allMessagesAndAuthors.map((obj) => (
          <div key={obj.messages._id} className={Style.root}>
            <div className={Style.use_conteiner}>
              {obj.user ? (
                <>
                  <img
                    className={Style.foto}
                    src={obj.user.avatar}
                    alt="аватарка"
                  />
                  <h3>
                    {obj.user.name}
                    <p>{`(${obj.user.gender}.${obj.user.age})`}</p>
                  </h3>
                  <p>{obj.user.sity}</p>
                  <span>{getTimeLocal(obj.messages.createdAt)}</span>
                  {user.admin && (
                    <button
                      onClick={() => deleteMessage(obj)}
                      className={Style.button_delete}
                    ></button>
                  )}
                </>
              ) : (
                <>
                  <img
                    className={Style.foto}
                    src="https://www.murrayglass.com/wp-content/uploads/2020/10/avatar-scaled.jpeg"
                    alt="аватарка"
                  />
                  <h3>Пользователь удалён</h3>
                  <p></p>
                  <span>00:00:00</span>
                </>
              )}
            </div>
            <p className={Style.massage}>{obj.messages.message}</p>
          </div>
        ))
      ) : (
        <p>здесь пока нет сообщений</p>
      )}
    </>
  );
}
