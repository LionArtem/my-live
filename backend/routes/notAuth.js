const notAuth = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getTopicsPaginetion,
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

module.exports = notAuth;
