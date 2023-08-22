const Topic = require('../models/topic');

const IncorrectErr = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');

const createTopic = (req, res, next) => {
  //const id = req.user._id;
  const { title } = req.body;
  Topic.create({
    title,
    owner: id,
  })
    .then((newTopic) => {
      res.status(201).send(newTopic);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectErr('Не корректные данные');
      } else {
        next(err);
      }
    });
};

const getTopics = (req, res, next) => {
  Topic.find()
    .then((topic) => {
      res.send(topic);
    })
    .catch((err) => {
      next(err);
    });
};

const getTopicsPaginetion = (req, res, next) => {
  const { page } = req.params;
  Topic.find()
    .then((topic) => {
      res.send({
        topic: topic.reverse().slice(page * 10 - 10, page * 10),
        numberTopics: topic.length,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const addInTopicMessage = (req, res, next) => {
  const { topicId } = req.params;
  const {
    message,
    userId,
  } = req.body;

  Topic.findByIdAndUpdate(
    topicId,
    {
      $push: {
        messages: {
          message,
          userId,
        },
      },
    },
    { new: true },
  )
    .then((resTopic) => {
      if (resTopic) {
        res.send(resTopic);
        return;
      }
      throw new NotFoundError('карточка с таким id не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new IncorrectErr('не корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

const deleteMessage = (req, res, next) => {
  const { topicId } = req.params;
  const {
    messageId,
  } = req.body;
  Topic.findByIdAndUpdate(
    topicId,
    {
      $pull: {
        messages: { _id: messageId },
      },
    },
    { new: true },
  )
    .then((resTopic) => {
      if (resTopic) {
        res.send(resTopic);
        return;
      }
      throw new NotFoundError('карточка с таким id не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new IncorrectErr('не корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

const getMessagePaginetion = (req, res, next) => {
  const { topicId } = req.params;
  const id = topicId.split('&')[0];
  const page = topicId.split('&')[1];

  Topic.findById(id).populate('owner')
    .then((topic) => {
      if (topic) {
        res.send({
          numberMessages: topic.messages.length,
          user: topic.owner,
          createdAt: topic.createdAt,
          title: topic.title,
          messages: topic.messages.slice(page * 10 - 10, page * 10),
        });
        return;
      }
      throw new NotFoundError('тема не найдена');
    })
    .catch(next);
};

const deleteTopic = (req, res, next) => {
  const { id } = req.params;
  Topic.findById(id)
    .then((cardFind) => {
      if (!cardFind) {
        const err = new NotFoundError('карточка с таким id не найдена');
        next(err);
        return;
      }
      cardFind.deleteOne()
        .then((card) => {
          res.send(card);
        }).catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new IncorrectErr('Не корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports = {
  createTopic,
  getTopics,
  addInTopicMessage,
  getMessagePaginetion,
  getTopicsPaginetion,
  deleteTopic,
  deleteMessage,
};
