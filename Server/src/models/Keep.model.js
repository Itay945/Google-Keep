const mongoose = require('mongoose');
const keepSchema = new mongoose.Schema({
  pin: {
    type: Boolean,
    // fix 0 problem maybe?
    // enum: [true, false],
    default: false,
  },
  title: {
    type: String,
    minLength: 1,
    maxLength: 999,
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 19999,
  },
  color: {
    type: String,
    // required: true,
    default: 'Transparent',
    enum: [
      'Coral',
      'Peach',
      'Sand',
      'Mint',
      'Sage',
      'Fog',
      'Storm',
      'Dusk,Blossom',
      'Clay',
      'Chalk',
      'Transparent',
    ],
  },
  labels: {
    type: [String],
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // add create date
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Keep', keepSchema);
