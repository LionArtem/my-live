const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const upload = require('../middlewares/upload');

const {
  getUsers,
  getUsersMe,
  patchUsersInfo,
  getUsersId,
  addUserFoto,
  deleteUsers,
  deleteUserFoto,
} = require('../controllers/users');

usersRouter.get('/ListUser/:page', celebrate({
  params: Joi.object().keys({
    page: Joi.string().required(),
  }),
}), getUsers);

usersRouter.delete('/delete/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteUsers);

usersRouter.get('/me', getUsersMe);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUsersId);

usersRouter.post('/add-file/', upload.single('avatar'), addUserFoto);

usersRouter.post('/delete-file/', deleteUserFoto);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    gender: Joi.string().min(1).max(1),
    name: Joi.string().min(2).max(30),
    town: Joi.string().min(2).max(50),
    age: Joi.number().min(18).max(80),
    email: Joi.string().email(),
  }),
}), patchUsersInfo);

module.exports = usersRouter;
