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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keep' }],
    default: [],
  },
});

// experimental
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.virtual('keeps', {
  ref: 'Keep',
  localField: '_id',
  foreignField: 'author',
});
module.exports = mongoose.model('User', userSchema);
