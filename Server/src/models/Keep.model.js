const e = require('express');
const mongoose = require('mongoose');
const keepSchema = mongoose.Schema({
  pin: {
    type: Boolean,
    enum: [true, false],
  },
  title: {
    type: String,
    maxLength: 1,
    maxLength: 999,
  },
  description: {
    type: String,
    maxLength: 1,
    maxLength: 19999,
  },
  color: {
    type: String,
    required: true,
    default: '#FFFFFF',
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
    ],
    labels: {
      type: Array,
      default: [],
    },
  },
});

module.exports = mongoose.model('Keep', keepSchema);
