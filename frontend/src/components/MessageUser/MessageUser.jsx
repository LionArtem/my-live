import React from 'react';
import { useSelector } from 'react-redux';

import Style from './MessageUser.module.scss';

import { selectUser } from '../../redax/slices/userSlice';

export default function MessageUser() {
  const { allMessagesAndAuthors } = useSelector(selectUser);
  return (
    <>
      {allMessagesAndAuthors.length > 0
        ? allMessagesAndAuthors.map((obj) => (
            <div key={obj.messages._id} className={Style.root}>
              <div className={Style.useConteiner}>
                {obj.user ? (
                  <>
                    <img
                      className={Style.foto}
                      src={obj.user.avatar}
                      alt="аватарка"
                    />
                    <h3>{`${obj.user.name} (${obj.user.gender}.${obj.user.age})`}</h3>
                    <p>{obj.user.sity}</p>
                    <span>2023-02-24 15.00</span>
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
                    <span>2023-02-24 15.00</span>
                  </>
                )}
              </div>
              <p className={Style.massage}>{obj.messages.message}</p>
            </div>
          ))
        : ''}
    </>
  );
}
