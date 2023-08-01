const mongoose = require('mongoose');
const validator = require('validator');
const { regularAvatar } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'name',
    minlength: 1,
    maxlength: 30,
  },
  gender: {
    type: String,
    minlength: 1,
    maxlength: 1,
    default: 'ж',
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
    min: [18],
    max: [80],
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
  admin: {
    type: Boolean,
  },
});

module.exports = mongoose.model('user', userSchema);
