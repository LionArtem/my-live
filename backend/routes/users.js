const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const { regularAvatar } = require('../utils/constants');
const upload = require('../middlewares/upload');

const {
  getUsers,
  getUsersMe,
  patchUsersInfo,
  getUsersId,
  addUserFoto,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUsersMe);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUsersId);

usersRouter.post('/add-file/', upload.single('avatar'), addUserFoto);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    gender: Joi.string().min(1).max(1),
    name: Joi.string().min(2).max(30),
    sity: Joi.string().min(2).max(30),
    age: Joi.number().min(18).max(80),
    email: Joi.string().email(),
  }),
}), patchUsersInfo);

module.exports = usersRouter;
