const mongoose = require('mongoose');
const validator = require('validator');
const { regularAvatar } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'name',
    minlength: 2,
    maxlength: 30,
  },
  sity: {
    type: String,
    default: 'Sity',
    minlength: 2,
    maxlength: 30,
  },
  age: {
    type: Number,
    default: 18,
  },
  avatar: {
    type: String,
    default: 'https://www.murrayglass.com/wp-content/uploads/2020/10/avatar-scaled.jpeg',
    validate: {
      validator: (v) => regularAvatar.test(v),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
