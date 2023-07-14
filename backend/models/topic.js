const mongoose = require('mongoose');
const { regularAvatar } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

  messages: [
    {
      message: { type: String, minlength: 1, maxlength: 300 },
      name: { type: String, minlength: 2, maxlength: 30 },
      sity: { type: String, minlength: 2, maxlength: 30 },
      avatar: {
        type: String,
        validate: {
          validator: (v) => regularAvatar.test(v),
        },
      },
      age: {
        type: Number,
        min: [18],
        max: [80],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('topic', cardSchema);
