import React, { useState } from 'react';

import Style from './FormEditUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import {
  setValue,
  selectformValidetion,
  defaultValues,
  killAllStateFormValidetion,
} from '../../redax/slices/formValidetionSlice';

import {
  fetchGetUser,
  fetchPatchUser,
  selectUser,
  addTextSuccess,
  setSuccessRequest,
} from '../../redax/slices/userSlice';
import FormEditUserPreloader from './FormEditUserPreloader';
import ButtonsNavigation from '../Buttons/ButtonsNavigation/ButtonsNavigation';
import BottonSubmit from '../Buttons/BottonSubmit/BottonSubmit';
import TextInteractionForm from '../TextInteractionForm/TextInteractionForm';
import { selectAuth } from '../../redax/slices/authSlice';
import ErrServer from '../ErrServer/ErrServer';

export default function FormEditUser() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { value, errors, valid } = useSelector(selectformValidetion);
  const [errorLoadingFile, setErrorLoadingFile] = useState('');

  const {
    user,
    showPreloader,
    textAnswerRequest,
    successRequest,
    showSceletonPage,
    errServer,
  } = useSelector(selectUser);

  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    return () => dispatch(killAllStateFormValidetion());
  }, []);

  React.useEffect(() => {
    dispatch(fetchGetUser()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(
          defaultValues({
            name: res.payload.name,
            email: res.payload.email,
            age: res.payload.age,
            avatar: res.payload.avatar,
            sity: res.payload.sity,
            gender: res.payload.gender,
          })
        );
      }
    });
  }, []);

  const findNoCoincidenceForm = (value1, value2) => {
    const valid =
      value1.age === value2.age &&
      value1.avatar === value2.avatar &&
      value1.email === value2.email &&
      value1.gender === value2.gender &&
      value1.name === value2.name &&
      value1.sity === value2.sity;
    return valid;
  };

  const deleteTextAnswerServer = () => {
    setTimeout(() => {
      dispatch(addTextSuccess(''));
      dispatch(setSuccessRequest(false));
    }, 1500);
  };

  const hendelSumit = (evt) => {
    evt.preventDefault();
    if (findNoCoincidenceForm(user, value)) {
      dispatch(addTextSuccess('изменения сохранены'));
      dispatch(setSuccessRequest(true));
      deleteTextAnswerServer();
    } else {
      dispatch(fetchPatchUser({ token })).then(() => {
        deleteTextAnswerServer();
      });
    }
  };

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
        // setFile({ result: render.result, file });
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

    fetch('http://localhost:3001/users/add-file', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || token}`,
      },
      body: avatar,
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((res) => {
            console.log(res.avatar);
            setFile(result);
            // dispatch(setUserAvatar(res.avatar));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (res.status === 500) {
          setErrorLoadingFile('на сервере произошла ошибка');
        } else {
          setErrorLoadingFile(res.statusText);
        }
      }
    });
  };

  return (
    <div className={Style.conteiner}>
      {/* <label>аватар</label> */}
      <img
        src={
          file ? file : user.avatar && `http://localhost:3001/${user.avatar}`
        }
        alt="аватар"
      />
      <input
        type="file"
        name="avatar-foto"
        onChange={(evt) => addFoto(evt)}
        accept="image/*"
        required
      ></input>
      {/* <button onClick={() => sendFile()}>ADD</button> */}
      <TextInteractionForm text={errorLoadingFile} />
      <form onSubmit={(evt) => hendelSumit(evt)} className={Style.form}>
        {showSceletonPage ? (
          <FormEditUserPreloader />
        ) : errServer ? (
          <ErrServer textErr="На сервере произошла ошибка, попробуйте зайти позже." />
        ) : (
          <>
            <label>ваше имя</label>
            <input
              pattern="^\S*$"
              value={value.name ?? ''}
              onChange={(evt) => changeValue(evt)}
              name="name"
              placeholder="ввидите имя"
              required
              minLength={1}
              maxLength={30}
            ></input>
            <TextInteractionForm text={errors.name} />
            <div className={Style.conteiner_age_gender}>
              <label>возраст</label>
              <input
                className={Style.age}
                value={value.age ?? ''}
                onChange={(evt) => changeValue(evt)}
                name="age"
                type="number"
                min={18}
                max={80}
                placeholder="выберите ваш возраст"
                required
              ></input>
              <label>м</label>
              <input
                checked={value.gender === 'м' ? 'checked' : ''}
                className={Style.radio}
                value="м"
                onChange={(evt) => changeValue(evt)}
                type="radio"
                name="gender"
                placeholder="ввидите пол"
              ></input>

              <label>ж</label>
              <input
                checked={value.gender === 'ж' ? 'checked' : ''}
                className={Style.radio}
                value="ж"
                onChange={(evt) => changeValue(evt)}
                type="radio"
                name="gender"
                placeholder="ввидите пол"
              ></input>
            </div>
            <label>город</label>
            <input
              pattern="^\S*$"
              value={value.sity ?? ''}
              onChange={(evt) => changeValue(evt)}
              name="sity"
              placeholder="ввидите ваш город"
              required
              minLength={1}
              maxLength={30}
            ></input>
            <TextInteractionForm text={errors.sity} />
            <label>email</label>
            <input
              pattern="^\S*$"
              value={value.email ?? ''}
              onChange={(evt) => changeValue(evt)}
              name="email"
              type="email"
              placeholder="ввидите your email"
              required
            ></input>
            <TextInteractionForm text={errors.email} />
            <BottonSubmit
              valid={valid}
              showPreloader={showPreloader}
              successRequest={successRequest}
              textAnswerRequest={textAnswerRequest}
              text={'редактировать профиль'}
            />
          </>
        )}
      </form>
      <ButtonsNavigation page={'/my-page'} text={'Назад'} />
      <ButtonsNavigation page={'/'} text={'На главную'} />
    </div>
  );
}
