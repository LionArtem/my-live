const router = require('express').Router();
const topicRouter = require('./topic');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/topic', topicRouter);

module.exports = router;
