const User = require('../models/User.model');
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

// const createUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.json({ user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const register = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
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
    const newUser = new User({ name, lastName, email, password });
    await newUser.save();
    const token = _generateToken(newUser._id);

    res.status(201).json({
      success: true,
      data: { token, userId: newUser._id, email, name, lastName },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'server error' });
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
  createUser,
  allKeepsOfOneUserByHisId,
  _generateToken,
};
