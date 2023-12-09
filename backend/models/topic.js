const mongoose = require('mongoose');

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
      message: { type: String, minlength: 1, maxlength: 500 },
      quote: { type: String },
      userId: { type: String, minlength: 24, maxlength: 24 },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('topic', cardSchema);
