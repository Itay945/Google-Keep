const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isLogeIn: {
    type: Boolean,
    require: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
