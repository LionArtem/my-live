const topicRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const { regularAvatar } = require('../utils/constants');

const {
  createTopic,
  getTopics,
  getTopicId,
  addInTopicMessage,
} = require('../controllers/topic');

topicRouter.get('/', getTopics);

topicRouter.post(
  '/',
  celebrate({
    body: Joi.object()
      .keys({
        title: Joi.string().required().min(2).max(30),
      })
      .unknown(true),
  }),
  createTopic,
);

topicRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getTopicId);

topicRouter.put('/:topicId/message', celebrate({
  params: Joi.object().keys({
    topicId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object()
    .keys({
      message: Joi.string().required(),
      userId: Joi.string().hex().length(24).required(),
    }),
}), addInTopicMessage);

module.exports = topicRouter;
