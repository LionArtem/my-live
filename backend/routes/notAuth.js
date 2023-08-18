const notAuth = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getTopicsPaginetion,
  getMessagePaginetion,
} = require('../controllers/topic');

const {
  getUsersFaindId,
} = require('../controllers/users');

notAuth.get(
  '/topicList/:page',
  celebrate({
    params: Joi.object().keys({
      page: Joi.string().required(),
    }),
  }),
  getTopicsPaginetion,
);

notAuth.get(
  '/messageList/:topicId',
  celebrate({
    params: Joi.object().keys({
      topicId: Joi.string().required(),
    }),
  }),
  getMessagePaginetion,
);

notAuth.get('/faindIdUsers/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), getUsersFaindId);

module.exports = notAuth;
