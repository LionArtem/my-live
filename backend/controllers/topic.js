const Topic = require('../models/topic');

const IncorrectErr = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');

const createTopic = (req, res, next) => {
  const id = req.user._id;
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
  Topic.find().populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const getTopicId = (req, res, next) => {
  const { id } = req.params;

  Topic.findById(id).populate('owner')
    .then((topic) => {
      if (topic) {
        res.send(topic);
        return;
      }
      throw new NotFoundError('тема не найдена');
    })
    .catch(next);
};

const addInTopicMessage = (req, res, next) => {
  const { topicId } = req.params;
  const {
    message,
    sity,
    avatar,
    age,
    name,
    gender,
  } = req.body;

  Topic.findByIdAndUpdate(
    topicId,
    {
      $push: {
        messages: {
          message,
          gender,
          sity,
          avatar,
          age,
          name,
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

module.exports = {
  createTopic,
  getTopics,
  getTopicId,
  addInTopicMessage,
};
