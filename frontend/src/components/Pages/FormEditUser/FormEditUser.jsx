import React, { useRef, useState } from 'react';

import Style from './FormEditUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { usersApi } from '../../../utils/UserApi';

import {
  setValid,
  setValue,
  selectformValidetion,
  defaultValues,
  killAllStateFormValidetion,
} from '../../../redax/slices/formValidetionSlice';

import {
  fetchGetUser,
  fetchPatchUser,
  selectUser,
  addTextSuccess,
  setSuccessRequest,
} from '../../../redax/slices/userSlice';
import FormEditUserPreloader from './FormEditUserPreloader';
import ButtonsNavigation from '../../Buttons/ButtonsNavigation/ButtonsNavigation';
import ButtonSubmit from '../../Buttons/ButtonSubmit/ButtonSubmit';
import TextInteractionForm from '../../TextInteractionForm/TextInteractionForm';
import { selectAuth } from '../../../redax/slices/authSlice';
import ErrServer from '../../ErrServer/ErrServer';
import { allTown } from '../../../utils/AllTown';

export default function FormEditUser() {
  const sityRef = useRef();
  const dispatch = useDispatch();
  const refInputFile = useRef();
  const [file, setFile] = useState(null);
  const { value, errors, valid } = useSelector(selectformValidetion);
  const [errorLoadingFile, setErrorLoadingFile] = useState('');
  const [listTown, isListTown] = useState(false);
  const [showCities, setShowCities] = useState([]);
  const [town, setTown] = useState('');

  const catList = (list, num) => {
    setShowCities(list.slice(0, num));
  };

  const addSityInList = (evt, arr) => {
    if (
      evt.target.scrollHeight - evt.target.scrollTop ===
      evt.target.clientHeight
    ) {
      catList(allTown, arr.length + 10);
    }
  };

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
            // town: res.payload.town,
            gender: res.payload.gender,
          })
        );
        setTown(res.payload.town);
      }
    });

    catList(allTown, 10);
  }, []);

  const findNoCoincidenceForm = (value1, value2) => {
    const valid =
      value1.age === value2.age &&
      value1.avatar === value2.avatar &&
      value1.email === value2.email &&
      value1.gender === value2.gender &&
      value1.name === value2.name &&
      user.town === town;
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
      dispatch(fetchPatchUser({ token, town })).then(() => {
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

  const openListTown = () => {
    isListTown(!listTown);
  };

  const changeValueTown = (town) => {
    setTown(town);
    openListTown();
    dispatch(setValid(true));
  };

  let search = true;
  const searchTown = (evt, arr, time) => {
    if (search) {
      setTimeout(() => {
        const newArr = arr.filter((val) =>
          val.city.toLowerCase().includes(evt.target.value)
        );
        catList(newArr, 10);
        search = true;
      }, 1000);
      search = false;
    }
  };

  return (
    <div className={Style.conteiner}>
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
      <form onSubmit={(evt) => hendelSumit(evt)} className={Style.form}>
        {showSceletonPage ? (
          <FormEditUserPreloader />
        ) : errServer ? (
          <ErrServer textErr="На сервере произошла ошибка, попробуйте зайти позже." />
        ) : (
          <>
            <label className={Style.title}>ваше имя</label>
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
              <label className={Style.title}>возраст</label>
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
              <label className={Style.title}>м</label>
              <input
                checked={value.gender === 'м' ? 'checked' : ''}
                className={Style.radio}
                value="м"
                onChange={(evt) => changeValue(evt)}
                type="radio"
                name="gender"
                placeholder="ввидите пол"
              ></input>

              <label className={Style.title}>ж</label>
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
            <div className={Style.conteiner_town}>
              <p className={Style.town}>{town}</p>
              <div
                onClick={() => openListTown()}
                className={Style.conteiner_label_town}
              >
                <label className={Style.label_town}>выберите ваш город</label>
                <div
                  className={
                    listTown
                      ? `${Style.label_icon_off} ${Style.label_icon_onn}`
                      : Style.label_icon_off
                  }
                ></div>
              </div>
              <ul
                ref={sityRef}
                onScroll={(evt) => addSityInList(evt, showCities)}
                className={
                  listTown
                    ? `${Style.cities}`
                    : `${Style.cities} ${Style.cities_off}`
                }
              >
                <input
                  onChange={(evt) => searchTown(evt, allTown, 1000)}
                  placeholder="поиск"
                ></input>
                {showCities?.map((town, i) => (
                  <li
                    onClick={() =>
                      changeValueTown(`${town.city} (${town.region})`)
                    }
                    className={Style.list_town}
                    key={i}
                  >
                    {`${town.city} (${town.region})`}
                  </li>
                ))}
              </ul>
            </div>
            <label className={Style.title}>email</label>
            <input
              pattern="^\S*$"
              value={value.email ?? ''}
              onChange={(evt) => changeValue(evt)}
              name="email"
              type="email"
              placeholder="ввидите your email"
              required
              minLength={5}
              maxLength={50}
            ></input>
            <TextInteractionForm text={errors.email} />
            <ButtonSubmit
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
