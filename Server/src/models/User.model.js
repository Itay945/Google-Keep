const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userKeeps: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Keep' }],
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
