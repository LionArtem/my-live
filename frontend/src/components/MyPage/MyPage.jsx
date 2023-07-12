import React from 'react';
import Style from './MyPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUser, selectUser } from '../../redax/slices/userSlice';
import { Link } from 'react-router-dom';

export default function MyPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  React.useEffect(() => {
    dispatch(fetchGetUser());
  }, []);

  return (
    <div className={Style.root}>
      <div className={Style.useConteiner}>
        <img className={Style.foto} src={user.avatar} alt="аватарка" />
        <h3>{user.name}</h3>
        <p>{user.age}</p>
        <p>{user.sity}</p>
        <p>{user.email}</p>
        <Link to="/edit-user">
          <p>Edit profile</p>
        </Link>
      </div>
    </div>
  );
}
