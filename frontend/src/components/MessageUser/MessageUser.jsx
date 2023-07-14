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
                <img className={Style.foto} src={obj.avatar} alt="аватарка" />
                <h3>{`${obj.name} (${obj.gender}.${obj.age})`}</h3>
                <p>{obj.sity}</p>
                <span>2023-02-24 15.00</span>
              </div>
              <p className={Style.massage}>{obj.message}</p>
            </div>
          ))
        : ''}
    </>
  );
}
