const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regularAvatar } = require('../utils/constants');

const {
  getUsers,
  getUsersMe,
  patchUsersInfo,
  getUsersId,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUsersMe);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUsersId);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    sity: Joi.string().min(2).max(30),
    age: Joi.number().min(18).max(80),
    email: Joi.string().email(),
    avatar: Joi.string().pattern(regularAvatar),
  }),
}), patchUsersInfo);

module.exports = usersRouter;
