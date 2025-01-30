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
const {
  addLabel,
  deleteLabel,
  editLabel,
  getUserLabels,
} = require('../controllers/labelController');

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

// New label management routes
// These routes are protected with authToken middleware to ensure only authenticated users can access them
router.get('/labels', authToken, getUserLabels); // Get all labels for the authenticated user
router.post('/labels', authToken, addLabel); // Create a new label
router.put('/labels/:labelId', authToken, editLabel); // Edit an existing label
router.delete('/labels/:labelId', authToken, deleteLabel); // Delete a label

module.exports = router;
