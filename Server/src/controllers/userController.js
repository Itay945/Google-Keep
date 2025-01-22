const User = require('../models/User.model');
const Keep = require('../models/Keep.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    // populate('keeps') is a mongoose method that allows us to populate the userKeeps field with the actual keep objects
    const user = await User.find().select('userKeeps').populate('userKeeps');
    // const user = await User.find().populate('userKeeps');
    // console.log(user.userKeeps);
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const addKeepToUser = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title && !description) {
      return res
        .status(400)
        .json({ error: 'Title or description is required' });
    }

    const keep = new Keep({
      title,
      description,
      color: req.body.color || '#FFFFFF',
      pin: req.body.pin || false,
      author: req.user.userId,
    });

    await keep.save();

    const user = await User.findById(req.user.userId);
    user.userKeeps.push(keep._id);
    await user.save();

    res.status(201).json({ user, keep });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, lastName, email, password, userKeeps } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'please fill all required filed' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'this email existing already try another email',
      });
    }
    const newUser = new User({ name, lastName, email, password, userKeeps });
    await newUser.save();
    const token = _generateToken(newUser._id);
    console.log('newUser: ', newUser);
    console.log('token: ', token);

    res.status(201).json({
      success: true,
      data: { token, userId: newUser._id, email, name, lastName },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'server error' });
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'please fill all required filed' });
    }
    const user = await User.findOne({ email });
    console.log('user:', user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'email or password is incorrect',
      });
    }
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
      return res.status(400).json({
        success: false,
        message: 'email or password is incorrect',
      });
    }
    const token = _generateToken(user._id);
    // console.log('newUser: ', newUser);
    console.log('token: ', token);

    res.status(201).json({
      success: true,
      data: { token, userId: user._id, email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'server error' });
  }
};

const getUserTrashedKeeps = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate({
      path: 'userKeeps',
      match: { isDeleted: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.userKeeps);
  } catch (error) {
    console.error('Error fetching trashed keeps:', error);
    res.status(500).json({ error: error.message });
  }
};

const allKeepsOfOneUserByHisId = async (req, res) => {
  try {
    // console.log(req.params.id);
    const userKeepsById = await User.findById(req.params.id).populate(
      'userKeeps'
    );
    console.log(userKeepsById.userKeeps);
    res.json(userKeepsById.userKeeps);
  } catch (error) {
    console.log(error.message);
  }
};

const _generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT, { expiresIn: '24h' });
};

module.exports = {
  getAllUsers,
  register,
  allKeepsOfOneUserByHisId,
  _generateToken,
  login,
  addKeepToUser,
  getUserTrashedKeeps,
};
//
