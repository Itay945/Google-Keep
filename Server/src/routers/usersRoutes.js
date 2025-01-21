const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const {
  getAllUsers,
  register,
  allKeepsOfOneUserByHisId,
  login,
} = require('../controllers/userController');
const authToken = require('../middlewares/auth.middleware');

// get all users with all their properties
router.get('/', getAllUsers);

// router.get('/getUser', authToken, async (req, res) => {
//   try {
//     user = await User.findById(req.user.userId)
//       .select('userKeeps')
//       .populate('userKeeps');
//     res.json({ user: user });
//   } catch (error) {}
// });
router.get('/getUser', authToken, async (req, res) => {
  try {
    user = await User.findById(req.user.userId).select('name');
    res.json({
      userName: user.name,
      userLastName: user.lastName,
      userEmail: user.email,
      userId: user._id,
    });
  } catch (error) {}
});

// post new user
router.post('/', register);

// login user
router.post('/login', login);

// get user keeps by his id
router.get('/:id', allKeepsOfOneUserByHisId);

module.exports = router;

//get all keeps of users (need to be in users or to be remove)
// router.get('/', async (req, res) => {
//   try {
//     // populate('keeps') is a mongoose method that allows us to populate the userKeeps field with the actual keep objects
//     const users = await User.find().select('userKeeps').populate('userKeeps');
//     // console.log(user[1].userKeeps);
//     users.forEach((user) => {
//       console.log(user.userKeeps);
//     });

//     // const user = await User.find().populate('userKeeps');
//     // console.log(user.userKeeps);

//     res.json(user);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });
