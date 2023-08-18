const topicRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const { regularAvatar } = require('../utils/constants');

const {
  createTopic,
  getTopics,
  addInTopicMessage,
  // getMessagePaginetion,
  // getTopicsPaginetion,
  deleteTopic,
  deleteMessage,
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

// topicRouter.get(
//   '/:topicId/message',
//   celebrate({
//     params: Joi.object().keys({
//       topicId: Joi.string().required(),
//     }),
//   }),
//   getMessagePaginetion,
// );

topicRouter.put('/:topicId/message', celebrate({
  params: Joi.object().keys({
    topicId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object()
    .keys({
      message: Joi.string().required().min(1).max(500),
      userId: Joi.string().hex().length(24).required(),
    }),
}), addInTopicMessage);

topicRouter.patch('/:topicId/message', celebrate({
  params: Joi.object().keys({
    topicId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object()
    .keys({
      messageId: Joi.string().hex().length(24).required(),
    }),
}), deleteMessage);

topicRouter.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteTopic,
);

module.exports = topicRouter;
