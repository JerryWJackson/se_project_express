const mongoose = require('mongoose');
const validator = require('validator');
const user = require('./user');

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [2, 'You must enter a minimum of 2 characters'],
    max: [30, 'You must enter a maximum of 30 characters'],
  },
  weather: {
    type: String,
    required: true,
    enum: ['Hot', 'Warm', 'Cold']
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'You must enter a valid URL',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: user,

  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('clothingItems', clothingItem);
