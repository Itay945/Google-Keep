const mongoose = require('mongoose');
const keepSchema = mongoose.Schema({
  title: {
    type: String,
  },
});

module.exports = mongoose.model('Keep', keepSchema);
