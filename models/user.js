const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Must be a minimum of 2 characters'],
    maxLength: [30, 'Must be a maximum of 30 characters'],
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'You must enter a valid URL',
    }
  },
});

module.exports = mongoose.model('user', userSchema);