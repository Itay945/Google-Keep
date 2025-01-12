const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

// get all users with all their properties
router.get('/', async (req, res) => {
  try {
    // populate('keeps') is a mongoose method that allows us to populate the userKeeps field with the actual keep objects
    const user = await User.find().select('userKeeps').populate('userKeeps');

    // const user = await User.find().populate('userKeeps');
    // console.log(user.userKeeps);

    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

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

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get user keeps by his id
router.get('/:id', async (req, res) => {
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
});

module.exports = router;
