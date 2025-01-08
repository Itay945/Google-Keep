const mongoose = require('mongoose');
const keepSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Keep', keepSchema);
