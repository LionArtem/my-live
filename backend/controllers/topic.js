const Topic = require('../models/topic');

const IncorrectErr = require('../errors/incorrect-err');

const createTopic = (req, res, next) => {
  // const id = req.user._id;
  const { title } = req.body;
  Topic.create({
    title,
    // owner: id,
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
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createTopic,
  getTopics,
};
