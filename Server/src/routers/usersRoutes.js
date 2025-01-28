const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const {
  getAllUsers,
  register,
  login,
  getProfile,
  getUserByHisToken,
} = require('../controllers/userController');
const authToken = require('../middlewares/auth.middleware');
const { addNewKeep } = require('../controllers/keepsController');
const Keep = require('../models/Keep.model');
// get all users with all their properties

router.get('/', getAllUsers);
router.post('/', register);
router.post('/login', login);
router.get('/profile', authToken, getProfile);

router.get('/', getAllUsers);

// get user by his token
router.get('/getUser', authToken, getUserByHisToken);

module.exports = router;
