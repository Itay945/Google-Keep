const mongoose = require('mongoose');
const keepSchema = new mongoose.Schema({
  pin: {
    type: Boolean,
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
    required: true,
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
    required: true,
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
  reminderDate: {
    type: Date,
    default: null, // null means no reminder
  },
  position: {
    type: Number,
    default: 0,
    required: true,
  },
});
// keepSchema.pre('save', async function (next) {
//   if (this.isNew && !this.position) {
//     const lastKeep = await this.constructor
//       .findOne({})
//       .sort('-position')
//       .exec();
//     this.position = lastKeep ? lastKeep.position + 1 : 0;
//   }
//   next();
// });

module.exports = mongoose.model('Keep', keepSchema);
