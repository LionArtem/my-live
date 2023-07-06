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

module.exports = {
  createTopic,
  getTopics,
  getTopicId,
};
