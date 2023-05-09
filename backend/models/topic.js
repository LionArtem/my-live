const mongoose = require('mongoose');
// const { regularLink } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('topic', cardSchema);
