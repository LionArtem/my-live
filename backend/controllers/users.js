require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, EMAIL_ADMIN } = process.env;

const RepeatsEmailError = require('../errors/repeats-email-err');
const IncorrectErr = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');
const NotauthorizationError = require('../errors/authorization-err');

const createUsers = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;// получим из объекта запроса имя и описание пользователя
  let admin;
  if (email === EMAIL_ADMIN) {
    admin = true;
  } else {
    admin = false;
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      admin,
    }).then((newUser) => {
      const newUserNoPassword = newUser.toObject();
      delete newUserNoPassword.password;
      res.send(newUserNoPassword);
    })
      .catch((err) => {
        if (err.code === 11000) {
          const error = new RepeatsEmailError('Пользователь с таким email зарегистрирован');
          next(error);
        } else {
          const error = new IncorrectErr('не корректные данные');
          next(error);
        }
        next(err);
      }));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotauthorizationError('Неправильные почта или пароль'));
      // пользователь с такой почтой не найден
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
          // хеши не совпали — отклоняем промис
            return Promise.reject(new NotauthorizationError('Неправильные почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
            // 'some-secret-key',
            { expiresIn: '7d' },
          );
          res.send({ token });
        })
        .catch((err) => {
          next(err);
        });
    // пользователь найден
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find()
    .then((user) => res.send(user))
    .catch(next);
};

const getUsersMe = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      throw new NotFoundError('пользователь не найден');
    })
    .catch(next);
};

const getUsersId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      throw new NotFoundError('пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new IncorrectErr('Некорректный id');
        next(error);
      } else {
        next(err);
      }
    });
};

const patchUsersInfo = (req, res, next) => {
  const id = req.user._id;
  const {
    age, avatar, email, name, sity, gender,
  } = req.body;
  User.findByIdAndUpdate(
    id,
    {
      age, avatar, email, name, sity, gender,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const erros = new IncorrectErr('Некорректный данные');
        next(erros);
      } else if (err.codeName === 'DuplicateKey') {
        const erros = new RepeatsEmailError('Этот email уже существует');
        next(erros);
      } else {
        next(err);
      }
    });
};

const getUsersFaindId = (req, res, next) => {
  const { id } = req.params;
  const { arrIdUser } = JSON.parse(id);

  User.find()
    .then((users) => {
      const arrUser = [];
      arrIdUser.forEach((idUser) => {
        arrUser.push(users.find((user) => user._id.toString() === idUser));
      });
      res.send(arrUser);
    })
    .catch(next);
};

module.exports = {
  createUsers,
  getUsers,
  getUsersMe,
  patchUsersInfo,
  login,
  getUsersId,
  getUsersFaindId,
};
