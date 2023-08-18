const notAuth = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getTopicsPaginetion,
  getMessagePaginetion,
} = require('../controllers/topic');

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

module.exports = notAuth;
