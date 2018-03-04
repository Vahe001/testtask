const mongoose = require('mongoose');

const AppConstants = require('./../../../settings/constants');

const Schema = mongoose.Schema;

let UsersSchema = new Schema({
  fullname: {
    type: String,
    minLength: AppConstants.NAME_MIN_LENGTH,
    maxLength: AppConstants.NAME_MAX_LENGTH,
    default: null
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    index: {unique: true},
    minLength: AppConstants.USERNAME_MIN_LENGTH,
    maxLength: AppConstants.USERNAME_MAX_LENGTH
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: AppConstants.EMAIL_MIN_LENGTH,
    maxLength: AppConstants.EMAIL_MAX_LENGTH
  },
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'User'
  },
});

module.exports = mongoose.model('users', UsersSchema);
