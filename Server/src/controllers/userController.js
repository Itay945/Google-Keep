const User = require('../models/User.model');
const Keep = require('../models/Keep.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Error handler helper
const handleError = (res, error, statusCode = 500) => {
  console.error('Error:', error);
  const message = error.message || 'An unexpected error occurred';
  res.status(statusCode).json({ success: false, message });
};

// Response helper
const sendResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('name email userKeeps')
      .populate('userKeeps');

    sendResponse(res, { users });
  } catch (error) {
    handleError(res, error);
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
      color: req.body.color,
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
    const { name, lastName, email, password } = req.body;

    // Validation
    if (!email || !password) {
      return handleError(
        res,
        new Error('Please fill all required fields'),
        400
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleError(res, new Error('Email already exists'), 400);
    }

    // Create new user
    const newUser = new User({
      name,
      lastName,
      email,
      password,
    });

    await newUser.save();
    const token = _generateToken(newUser._id);
    sendResponse(
      res,
      {
        token,
        user: {
          id: newUser._id,
          name,
          lastName,
          email,
        },
      },
      201
    );
  } catch (error) {
    handleError(res, error);
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return handleError(
        res,
        new Error('Please fill all required fields'),
        400
      );
    }

    // Find user and validate password
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleError(res, new Error('Invalid credentials'), 401);
    }
    const token = _generateToken(user._id);
    sendResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    handleError(res, error);
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

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      'name lastName email'
    );

    if (!user) {
      return handleError(res, new Error('User not found'), 404);
    }

    sendResponse(res, { user });
  } catch (error) {
    handleError(res, error);
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
  getProfile,
};
//
