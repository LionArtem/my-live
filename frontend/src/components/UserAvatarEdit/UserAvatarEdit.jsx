import React, { useRef, useState } from 'react';
import Style from './UserAvatarEdit.module.scss';
import { selectAuth } from '../../redax/slices/authSlice';
import { selectUser } from '../../redax/slices/userSlice';

import TextInteractionForm from '../TextInteractionForm/TextInteractionForm';
import { usersApi } from '../../utils/UserApi';
import { useSelector } from 'react-redux';

export default function UserAvatarEdit() {
  const refInputFile = useRef();
  const { token } = useSelector(selectAuth);
  const { user } = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const [errorLoadingFile, setErrorLoadingFile] = useState('');

  const addFoto = (evt) => {
    const file = evt.target.files ? evt.target.files[0] : false;
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    try {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onloadend = () => {
        if (!render.result) return;
        sendFile({ result: render.result, file });
      };
    } catch (error) {
      setErrorLoadingFile('Ошибка при загрузке файла!');
      console.log(error, 'Ошибка при загрузке файла!');
    }
  };

  const sendFile = ({ result, file }) => {
    const avatar = new FormData();
    avatar.append('avatar', file);

    usersApi
      .addAvatar(avatar, token)
      .then(() => {
        setFile(result);
      })
      .catch((err) => {
        if (err.status === 500) {
          setErrorLoadingFile('на сервере произошла ошибка');
        } else {
          setErrorLoadingFile(err.statusText);
        }
      });
  };

  return (
    <>
      <div className={Style.container_avatar}>
        {
          <img
            src={
              file
                ? file
                : user.avatar
                ? `http://localhost:3001/${user.avatar}`
                : 'https://www.murrayglass.com/wp-content/uploads/2020/10/avatar-scaled.jpeg'
            }
            alt="аватар"
          />
        }
        <div
          className={Style.button_edit_foto}
          onClick={() => refInputFile.current.click()}
        ></div>
      </div>
      <input
        ref={refInputFile}
        className={Style.input_file}
        type="file"
        name="avatar-foto"
        onChange={(evt) => addFoto(evt)}
        accept="image/*"
        required
      ></input>
      <TextInteractionForm text={errorLoadingFile} />
    </>
  );
}
