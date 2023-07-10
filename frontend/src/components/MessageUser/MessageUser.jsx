import React from 'react';
import { useSelector } from 'react-redux';

import Style from './MessageUser.module.scss';

import { selectTopics } from '../../redax/slices/topicSlice';

export default function MessageUser() {
  const { topicMessage } = useSelector(selectTopics);
  return (
    <>
      {topicMessage.length > 0
        ? topicMessage.map((obj) => (
            <div key={obj._id} className={Style.root}>
              <div className={Style.useConteiner}>
                <img
                  className={Style.foto}
                  src="https://images.unsplash.com/photo-1674156395389-2574986a9c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="аватарка"
                />
                <h3>{`${obj.author} (ж.30)`}</h3>
                <p>Sity</p>
                <span>2023-02-24 15.00</span>
              </div>
              <p className={Style.massage}>{obj.message}</p>
            </div>
          ))
        : ''}
    </>
  );
}
